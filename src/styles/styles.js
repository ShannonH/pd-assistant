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
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto'
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3
  },
  chartContainer: {
    display: 'inline-block',
    width: '75%'
  },
  tableContainer: {
    height: 320
  },
  h5: {
    marginBottom: theme.spacing.unit * 2
  },
  chip: {
    margin: theme.spacing.unit
  },
  paperSheet: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
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
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit * 20
  },
  choiceContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  shortFields: {
    width: 500
  },
  progress: {
    margin: theme.spacing.unit * 2
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
    marginRight: theme.spacing.unit
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});
