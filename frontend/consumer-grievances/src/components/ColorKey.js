import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

export default function ColorKey() { 
return (   <Grid
    justify="center"
    style={{ marginBottom: "50px" }}
    item
    container
    direction={"row"}
  >
<div>
    <Box
      borderRadius={10}
      style={{ backgroundColor: "#ffea98" }}
      component="div"
      display="inline"
      p={1}
      m={1}
      bgcolor="background.paper"
    >
      Low
    </Box>
    <Box
      borderRadius={10}
      style={{ backgroundColor: "#ffb199" }}
      component="div"
      display="inline"
      p={1}
      m={1}
      bgcolor="background.paper"
    >
      Moderate
    </Box>
    <Box
      borderRadius={10}
      style={{ backgroundColor: "#ff8a80" }}
      component="div"
      display="inline"
      p={1}
      m={1}
      bgcolor="background.paper"
    >
      High
    </Box>
  </div>
  </Grid>
  )
}