import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@material-ui/core';

export default function FormDialog({open,handleClose,data,onChange,handleFormSubmit}) {
  const {id,id_grille,nom_grille,taille_grille,couleur_fond_grille}=data

  
  return (
    <div>
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{id?"modifier un grille":"Ajouter un grille"}</DialogTitle>
        <DialogContent>
        <form>
             <TextField id="id_grille" value={id_grille} onChange={e=>onChange(e)} placeholder="Enter id" label="id_grille" variant="outlined" margin="dense" fullWidth required />
             <TextField id="nom_grille" value={nom_grille} onChange={e=>onChange(e)} placeholder="Enter nom_grille" label="nom_grille" variant="outlined" margin="dense" fullWidth  required/>
             <TextField id="taille_grille" value={taille_grille} onChange={e=>onChange(e)} placeholder="Enter taille grille" label="taille_grille" variant="outlined" margin="dense" fullWidth required />
             <TextField id="couleur_fond_grille" value={couleur_fond_grille} onChange={e=>onChange(e)} placeholder="Enter couleur_fond_grille" label="couleur_fond_grille" variant="outlined" margin="dense" fullWidth required />
         </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="outlined" >Annuler</Button>
          <Button  color="primary" onClick={()=>handleFormSubmit()} variant="contained">
            {id?"Update":"Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
