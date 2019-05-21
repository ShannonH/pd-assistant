import Card from '@material-ui/core/Card/index';
import CardActions from '@material-ui/core/CardActions/index';
import CardContent from '@material-ui/core/CardContent/index';
import IconButton from '@material-ui/core/IconButton/index';
import { withStyles } from '@material-ui/core/styles/index';
import ToolTip from '@material-ui/core/Tooltip/index';
import Typography from '@material-ui/core/Typography/index';
import BarChartIcon from '@material-ui/icons/BarChart';
import AddIcon from '@material-ui/icons/Add';
import DevBoardIcon from '@material-ui/icons/DeveloperBoard';
import * as PropTypes from 'prop-types';
import React from 'react';

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
};

let teamName;

function TeamCard(props) {
  //let randomImage = Faker.random.image();
  switch (props.team) {
    case 'VHS':
      teamName = 'Team VHS';
      break;
    case 'Betamax':
      teamName = 'Team Betamax';
      break;
    case 'Alpha':
      teamName = 'Team Alpha';
      break;
    default:
      teamName = 'Your Team Here';
      break;
  }

  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {teamName}
        </Typography>
      </CardContent>
      <CardActions>
        <ToolTip title="Projects">
          <IconButton size="small" color="secondary">
            <DevBoardIcon />
          </IconButton>
        </ToolTip>
        <ToolTip title="Analyses">
          <IconButton size="small" color="secondary">
            <BarChartIcon />
          </IconButton>
        </ToolTip>
        <ToolTip title="New Analysis">
          <IconButton size="small" color="secondary">
            <AddIcon />
          </IconButton>
        </ToolTip>
      </CardActions>
    </Card>
  );
}

TeamCard.propTypes = {
  classes: PropTypes.object.isRequired,
  team: PropTypes.string.isRequired
};

export default withStyles(styles)(TeamCard);
