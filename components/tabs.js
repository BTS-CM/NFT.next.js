import dynamic from 'next/dynamic'
const Box = dynamic(() => import('@material-ui/core/Box'));
const Typography = dynamic(() => import('@material-ui/core/Typography'));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      color="inherit"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} color="inherit">
          <Typography color="inherit">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

export {
  TabPanel,
  a11yProps
}
