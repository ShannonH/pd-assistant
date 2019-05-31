export const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  fab: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed'
  },
  content: {
    textAlign: 'center',
    flexGrow: 1,
    padding: theme.spacing(3),
    height: '100vh',
    overflow: 'auto'
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3)
  },
  chartContainer: {
    display: 'inline-block',
    width: '75%'
  },
  tableContainer: {
    height: 320
  },
  h5: {
    marginBottom: theme.spacing(2)
  },
  chip: {
    margin: theme.spacing(1)
  },
  paperSheet: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(6)
  },
  bottomSave: {
    margin: 20,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed'
  },
  midTextField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(20)
  },
  choiceContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  hangingindent: {
    paddingLeft: 22,
    textIndent: -22
  },
  shortFields: {
    width: 500
  },
  progress: {
    margin: theme.spacing(2)
  },
  actionButtons: {
    display: 'inline',
    position: 'absolute',
    right: 20
  },
  radioLabel: {
    fontSize: '14px'
  },
  stepperButton: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
});
