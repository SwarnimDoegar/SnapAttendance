import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
    title: {
        fontSize: 14
    },
    content: {
        fontSize: 12
    },
    fullWidth: {
        width: "100%"
    },
    spinner: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(30)
    },
}))


export default function DashBoard()
{
    const [attendance, setAttendance] = useState([])
    const [loading, setLoading] = useState(false)
    const [invalid, setInvalid] = useState(false)
    const cacheMinute = 5;

    useEffect(() => {
        if (localStorage.getItem('attendance') && (Date.now() - parseInt(localStorage.getItem('timestamp')) <= 1000 * 60 * cacheMinute)) {
            setAttendance(JSON.parse(localStorage.getItem('attendance')))
        }

        else {
            const formdata = new FormData()
            formdata.append('uid', localStorage.getItem('uid'))
            formdata.append('password', localStorage.getItem('password'))
            setLoading(true)
            fetch('http://localhost:5000/api', {
                method: 'POST',
                body: formdata
            }).then(data => data.json()).then(data => {
                // console.log(data);

                //check error here also
                if (data.error)
                    setInvalid(true)

                else {
                    setLoading(false)
                    setAttendance(data)

                    localStorage.setItem('attendance', JSON.stringify(data))
                    localStorage.setItem('timestamp', Date.now())
                }
            })
        }
    }, [])

    

    const classes = useStyles();
    return !loading ? (
        <List component="ul">
            {attendance.map(subject => ( 
            <ListItem key={subject.Code}>
                <CardActionArea>
                        <Card className={classes.fullWidth} button>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    {subject.Title} [{subject.Code}]
                                </Typography>
                                <Typography variant="h6" color="textSecondary" className={classes.content}>
                                    Total Percentage: {subject.TotalPercentage}
                                </Typography>
                                <Typography variant="h6" color="textSecondary" className={classes.content}>
                                    Total Attended: {subject.Total_Attd}
                                </Typography>
                                <Typography variant="h6" gutterBottom color="textSecondary" className={classes.content}>
                                    Total Delivered: {subject.Total_Delv}
                                </Typography>
                            </CardContent>
                        </Card>
                </CardActionArea>
            </ListItem>
            ))}
        </List>
    ) : (<div className={classes.spinner}> <CircularProgress /> </div>)
}