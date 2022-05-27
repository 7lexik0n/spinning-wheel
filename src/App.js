import React, { useState } from "react";
import Wheel from "./Components/Wheel";
import Form from "./Components/Form";
import { Box, Grid } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  const [variants, setVariants] = useState([]);
  const [edit, setEdit] = useState(null);
  const [rotating, setRotating] = useState(false);

  const addVariant = (variant) => {
    setVariants([
      {
        value: variant,
        id: `${variant.slice(0, 2)}-${Date.now()}`,
      },
      ...variants,
    ]);
  };

  const removeVariant = (id) => {
    setVariants([...variants.filter((variant) => variant.id !== id)]);
  };

  const launchWheel = () => {
    if (!rotating) {
      setRotating(true);
    }
  };

  const stopWheel = () => {
    setRotating(false);
  };

  const editVariant = (value) => {
    const index = variants.findIndex((variant) => variant.id === edit);
    const newVariants = [...variants];
    
    newVariants[index] = {
      value,
      id: edit,
    };

    setVariants(newVariants);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="app__container">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} justifyContent="center">
            <Grid
              item
              xs={12}
              md={6}
              lg={8}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Wheel
                variants={variants}
                rotating={rotating}
                stopWheel={stopWheel}
              />
            </Grid>
            <Grid item lg={4} md={6} xs={12} className="form">
              <Form
                variants={variants}
                addVariant={addVariant}
                removeVariant={removeVariant}
                launchWheel={launchWheel}
                edit={edit}
                setEdit={setEdit}
                editVariant={editVariant}
              />
            </Grid>
          </Grid>
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default App;
