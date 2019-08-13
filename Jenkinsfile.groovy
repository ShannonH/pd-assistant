/*
 * TODO replace with link to your projects' builds list
 * see https://jenkins-kubernetes.dev.bbpd.io/job/ultra/job/react-project-template/
 */

@Library( 'bb-common@1.x' ) _

GIT_CHECKOUT_URL = 'ssh://git@stash.bbpd.io/~sharris/pd-assistant.git'
PROJECT_NAME = 'pd-assistant'
SLACK_CHANNEL = '@theshannon'

// Some tunables you may want to update, depending on your project. Use the "Pod finished: metrics are at <link>"
// link to help tune these

TIMEOUT = 60 // minutes
CPU_LIMIT = '0.2' // cores
MEM_LIMIT = '1Gi' // memory limit, in gigabytes

properties( [
  buildDiscarder( logRotator( daysToKeepStr: '180', numToKeepStr: '30' ) ),
  disableConcurrentBuilds(),
] )

SHARED = library( identifier: 'jenkins-shared@v1', retriever: modernSCM( [
  $class: 'GitSCMSource',
  remote: 'ssh://git@stash.bbpd.io/sharedservices/jenkins-shared-microservices.git',
  credentialsId: 'jenkins-stash'
] ) ).com.blackboard.jenkins.microservices
GIT = SHARED.Git.new( this )
NODE = SHARED.Node.new( this )
STASH = SHARED.Stash.new( this )

timeout( time: TIMEOUT, unit: 'MINUTES' ) {
  timestamps {
    withBuildPod {
      withFailureNotifiers {
        stage( 'Checkout' ) {
          checkout scm: [
            $class: 'GitSCM',
            branches: [ [ name: env.BRANCH_NAME ] ],
            browser: [ $class: 'Stash', repoUrl: GIT_CHECKOUT_URL ],
            extensions: [
              [ $class: 'PruneStaleBranch' ],
              [ $class: 'LocalBranch', localBranch: env.BRANCH_NAME ],
            ],
            userRemoteConfigs: [ [
                credentialsId: 'jenkins-stash',
                url: GIT_CHECKOUT_URL,
            ] ]
          ]
        }

        if ( STASH.buildTriggeredByJenkinsCommit() ) {
          currentBuild.result = 'SUCCESS'
          echo 'Skipping build for commit(s) by Jenkins'
        } else {
          stage( 'Prepare' ) {
            prepare()
          }

          stage( 'Build' ) {
            build()
          }

          stage( 'Test' ) {
            try {
              runTests()
            } finally {
              publishTestReports()
            }
          }

          if ( isProductionBranch() ) {
            stage( 'Publish to NPM' ) {
              publish()
            }
          }
        }
      }
    }
  }
}

def withFailureNotifiers( Closure block ) {
  bb.stash.notifier {
    withSlackNotifier( SLACK_CHANNEL, [ verbosity: 'changesOnly', silenced: !isProductionBranch() ] ) {
      block()
    }
  }
}

def withBuildPod( Closure block ) {
  bb.pod.create(
    label: PROJECT_NAME,
    containers: [
      containerTemplate(
        name: 'node',
        image: 'node:10.13.0',
        ttyEnabled: true,
        command: '/bin/cat',
        resourceRequestCpu: CPU_LIMIT,
        resourceRequestMemory: MEM_LIMIT,
      ),
    ],
    volumes: [
      // the following secret volumes are required for directives in the shared library
      secretVolume( secretName: 'stash-jenkins-nirvana', mountPath: '/home/jenkins/ssh-stash-jenkins-nirvana' ),
      secretVolume( secretName: 'npm-publish-token', mountPath: '/home/jenkins/npm-publish-token' ),
    ],
  ) {
    withAnsiColor {
      block()
    }
  }
}

def withAnsiColor( Closure block ) {
  wrap( [ $class: 'AnsiColorBuildWrapper', 'colorMapName': 'XTerm' ] ) {
    block()
  }
}

def prepare() {
  container( 'node' ) {
    sh 'npm ci'
  }
}

def build() {
  container( 'node' ) {
    sh 'npm run build'
  }
}

def runTests() {
  container( 'node' ) {
    sh 'npm run test'
  }
}

/**
 * Collect unit test and coverage reports
 */
def publishTestReports() {
  // junit report
  junit testDataPublishers: [ [ $class: 'AttachmentPublisher' ] ],
        testResults: 'jest/junit/test-results.xml',
        allowEmptyResults: false

  // coverage report
  publishHTML(
    target: [
      allowMissing: true,
      alwaysLinkToLastBuild: false,
      keepAll: true,
      reportDir: 'jest/coverage',
      reportFiles: 'index.html',
      reportName: 'HTML Code Coverage Report'
    ]
  )
}

def isProductionBranch() {
  return GIT.isDevelop() || GIT.isMaster() || isReleaseBranch()
}

def isReleaseBranch() {
  return env.BRANCH_NAME.startsWith( 'release/' )
}

def publish() {
  container( 'node' ) {
    withStashCredentials {

      NODE.incrementPackageVersion( '.' )
      version = NODE.getPackageVersion( '.' )

      GIT.add( 'package.json' )
      GIT.add( 'package-lock.json' )
      GIT.commit( "Automatic version bump $version" )
      GIT.push()
    }
  }
}
