import React, { useState, useRef } from "react";
import {
  Box,
  Paper,
  Typography,
  InputBase,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Form = ({
  variants,
  addVariant,
  removeVariant,
  launchWheel,
  edit,
  setEdit,
  editVariant,
}) => {
  const [value, setValue] = useState("");
  const inputEl = useRef(null);

  const handleChange = (evt) => {
    setValue(evt.target.value);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    onAdd();
  };

  const onAdd = () => {
    const val = value.trim();
    if (val !== "") {
      edit ? editVariant(val) : addVariant(val);
      setValue("");
      setEdit(null);
    }
  };

  const onRemove = (id) => {
    removeVariant(id);
  };

  const onEdit = (id) => {
    const currentVar = variants.find((variant) => variant.id === id);
    setValue(currentVar.value);
    setEdit(id);
    inputEl.current.focus();
  };

  return (
    <Paper className="form__container">
      <Typography className="form__title" variant="h5" component="h1">
        Список вариантов
      </Typography>
      <Box
        component="form"
        sx={{
          p: "2px 10px",
          paddingLeft: "22px",
          display: "flex",
          alignItems: "space-between",
          width: "100%",
        }}
        onSubmit={onSubmit}
      >
        <InputBase
          sx={{ flex: 1 }}
          placeholder="Введите свой вариант"
          value={value}
          onChange={handleChange}
          inputRef={inputEl}
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
        <List dense={false} sx={{ paddingRight: "8px" }}>
          {variants.map((variant) => {
            const val =
              variant.value.length > 30
                ? `${variant.value.slice(0, 30)}...`
                : variant.value;
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
                <ListItemIcon>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => onEdit(variant.id)}
                  >
                    <EditIcon />
                  </IconButton>
                </ListItemIcon>
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
