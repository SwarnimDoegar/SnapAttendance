import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Toolbar from '@material-ui/core/Toolbar';
import Slide from '@material-ui/core/Slide';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    progressMargin: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    secondary: {
        color: 'textSecondary',
        float: 'right'
    }
}));


function CircularProgressWithLabel(props) {
    const classes = useStyles();
    return (
        <Box className={classes.circular} position="relative" display="inline-flex">
            <CircularProgress size={200} variant="static" {...props}/>
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="h4" component="div" color="textPrimary">
                    {props.value + "%"}
                </Typography>
            </Box>
        </Box>
    );
}

CircularProgressWithLabel.propTypes = {
    value: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
};

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function SubjectDetail(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleClose = () => {
        setOpen(false);
        props.close({});
    };

    return (
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {props.subject['Title']}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container fixed className={classes.progressMargin}>
                <CircularProgressWithLabel value={parseFloat(props.subject['TotalPercentage'])} color={props.subject.colorcode === 'Green' ? 'primary' : 'secondary'}/>
            </Container>
            <List>
                <ListItem>
                    <ListItemText disableTypography primary={<><Typography variant='button'>Total Delivered</Typography><Typography className={classes.secondary} variant='inherit'>{props.subject.Total_Delv}</Typography></>} />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText disableTypography primary={<><Typography variant='button'>Total Attended</Typography><Typography className={classes.secondary} variant='inherit'>{props.subject.Total_Attd}</Typography></>} />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText disableTypography primary={<><Typography variant='button'>Duty Leave N P</Typography><Typography className={classes.secondary} variant='inherit'>{props.subject.DutyLeave_N_P}</Typography></>} />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText disableTypography primary={<><Typography variant='button'>Duty Leave Others</Typography><Typography className={classes.secondary} variant='inherit'>{props.subject.DutyLeave_Others}</Typography></>} />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText disableTypography primary={<><Typography variant='button'>Medical Leave</Typography><Typography className={classes.secondary} variant='inherit'>{props.subject.MedicalLeave}</Typography></>} />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText disableTypography primary={<><Typography variant='button'>Eligible Delivered</Typography><Typography className={classes.secondary} variant='inherit'>{props.subject.EligibilityDelivered}</Typography></>} />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText disableTypography primary={<><Typography variant='button'>Eligible Attended</Typography><Typography className={classes.secondary} variant='inherit'>{props.subject.EligibilityAttended}</Typography></>} />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText disableTypography primary={<><Typography variant='button'>Eligible Percentage</Typography><Typography className={classes.secondary} variant='inherit'>{props.subject.EligibilityPercentage}</Typography></>} />
                </ListItem>
                <Divider />
            </List>
        </Dialog>
    )
}

export default SubjectDetail
