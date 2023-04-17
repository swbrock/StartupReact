import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  Typography,
} from "@mui/material";
interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  text: string;
}

const DeleteDialog = ({ open, onClose, onDelete, text }: DeleteDialogProps) => {
  return (
    <Dialog open={open}>
      <Card sx={{ minWidth: { md: "500px" } }}>
        <CardContent
          sx={{ display: "flex", flexDirection: "column", gap: ".2rem" }}
        >
          <Typography variant="h6">
            Are you sure you want to delete {text}?
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button color="error" onClick={onDelete}>
            Delete
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </CardActions>
      </Card>
    </Dialog>
  );
};

export default DeleteDialog;
