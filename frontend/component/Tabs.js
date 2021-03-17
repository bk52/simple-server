import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    label: {
        textTransform: "none",
    },
}));

export default React.forwardRef((props, ref) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const tabItems = [];
    const tabPanels = [];

    props.tabList.map((item) => {
        tabItems.push(
            <Tab
                className={classes.label}
                label={item.title}
                icon={item.icon}
                {...a11yProps(item.index)}
            />
        );
        tabPanels.push(
            <TabPanel value={value} index={item.index}>
                {item.component}
            </TabPanel>
        );
    });

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Tabs
                variant="fullWidth"
                indicatorColor="primary"
                textColor="primary"
                value={value}
                onChange={handleChange}>
                {tabItems}
            </Tabs>
            {tabPanels}
        </div>
    );
}
)