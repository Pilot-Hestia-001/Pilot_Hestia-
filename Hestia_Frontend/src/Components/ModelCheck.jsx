import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const ModalCheck = ({size, id}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
      setOpen(false);
  }

  const handleSubmit = async() => {
    const formData = {
        reward_id : id,
        sizeKey : size,
        value : false,
    }
    try{
        const res = await axios.put(`${API_URL}/api/rewards/update/size`, formData)
        console.log(res?.data)
    } catch(e) {
       console.log("something went wrong with updating sizes", e)
    }
  } 

    return(
        <>
          <Button onClick={handleOpen} variant="contained" name={size} sx={{ backgroundColor: '#ff2400', color: 'white', marginTop:"10px", fontWeight: 600,}}>{size.toUpperCase()}</Button>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography sx={{  marginBottom: "10px"}} id="modal-modal-title" variant="h6" component="h2">
                       Are you sure? 
                    </Typography>
                    
                    <div>
                    <Button onClick={handleSubmit(e.target.name)} variant="contained" sx={{ backgroundColor: '#ff2400', color: 'white', marginTop:"12px", fontWeight: 600,}} >Yes</Button>
                    <Button onClick={handleClose} variant="contained" sx={{ backgroundColor: '#ff2400', color: 'white', marginTop:"12px", fontWeight: 600,}} >cancel</Button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default ModalCheck