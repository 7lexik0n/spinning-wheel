import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  InputBase,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";

const Form = ({ variants, addVariant, removeVariant, launchWheel }) => {
  const [value, setValue] = useState("");

  const handleChange = (evt) => {
    setValue(evt.target.value);
  };

  const onAdd = () => {
    addVariant(value.trim());
    setValue("");
  };

  const onRemove = (id) => {
    removeVariant(id);
  };

  return (
    <Paper className="form__container">
      <Typography className="form__title" variant="h5" component="h1">
        Список вариантов
      </Typography>
      <Box
        sx={{
          p: "2px 10px",
          display: "flex",
          alignItems: "space-between",
          width: "100%",
        }}
      >
        <InputBase
          sx={{ flex: 1 }}
          placeholder="Введите свой вариант"
          value={value}
          onChange={handleChange}
        />
        <IconButton
          color="primary"
          sx={{ p: "10px" }}
          aria-label="directions"
          onClick={onAdd}
        >
          <AddCircleIcon />
        </IconButton>
      </Box>
      {variants && (
        <List dense={false}>
          {variants.map((variant) => {
            const val = variant.value.length > 30 ? `${variant.value.slice(0, 30)}...` : variant.value;
            return (
              <ListItem
                key={variant.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => onRemove(variant.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={val} />
              </ListItem>
            );
          })}
        </List>
      )}
      {variants && variants.length > 1 && (
        <Box sx={{ textAlign: "center", p: "5px 10px 15px" }}>
          <Button variant="contained" onClick={launchWheel}>
            Вращать
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default Form;
