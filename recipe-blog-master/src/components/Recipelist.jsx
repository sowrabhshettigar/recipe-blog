import Box from '@mui/material/Box';
import { useState,useEffect } from 'react';

import Axios from 'axios';
import * as React from 'react';
import Drawer from './Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import {TextField} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Pagination from '@mui/material/Pagination';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Chip from '@mui/material/Chip';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const drawerWidth = 200;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 750,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
  overflowY: 'auto',
  height: '100vh'
};

const style2 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  // p: 2,
};

const style3 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxHeight: '100vh', // Set a maximum height to allow scrolling
  overflowY: 'auto', // Enable vertical scrolling if the content exceeds the height
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};

export default function ClippedDrawer({dep}) {
  const navigate=useNavigate()

  const [form,setForm]=useState()
  const [count,setCount]=useState(0)

  const [getCategory,setGetCategory]=useState([]) //for useeffect
  const [categState,setCategState]=useState()  //for onchange

  const Input=(e)=>{
    setForm({...form,[e.target.name]:e.target.value})
    console.log(form)
  }

  const InputImage=(e)=>{
    setForm({...form,[e.target.name]:e.target.files[0]})
    console.log(form)
  }

  const handleCategory=(e)=>{
    setCategState(e.target.value)
  }

  const [getRecipes,setGetRecipes]=useState([])

  useEffect(()=>{
    Axios.get('http://localhost:7000/api/recipes/view')
    .then((res)=>{
      console.log(res.data,'res');
      setGetRecipes(res.data)
    })
    .catch((err)=>{
      alert(err)
    })
  },[count,dep])
  console.log(getRecipes,1);

  useEffect(()=>{
    Axios.get('http://localhost:7000/api/categories/view')
    .then((res)=>{
      console.log(res.data)
      setGetCategory(res.data)
    }).catch((err)=>{
      alert(err)
    })
  },[])
  console.log(getCategory,'ca')

  // Add states for search and filter
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Function to handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Function to handle category selection change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  let filteredRecipes = getRecipes.filter((recipe) => {
    return (
      recipe.recipeName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === '' || recipe.category_id?._id === selectedCategory)
    );
  });

  //snackbar code
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  //pagination code

  const [page, setPage] = useState(1); // State to manage current page
  const [rowsPerPage, setRowsPerPage] = useState(10); // State to manage rows per page

  // Function to handle page change
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  // Function to handle rows per page change
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1); // Reset page to 1 when changing rows per page
  };

  // Calculate the starting and ending indices for pagination
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  // Display rows based on the current page and rows per page
  const paginatedRows = filteredRecipes.slice(startIndex, endIndex);


  const [selected,setSelected]=useState('')

  //input recipe form 
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //view form
  const [open2, setOpen2] = React.useState(false);
  const handleOpenView = (i) => {
    setOpen2(true);
    setSelected(i)
  }

  const handleCloseView = () => setOpen2(false);

  //delete form
  const [open3, setOpen3] = React.useState(false);
  const handleOpenDel = (i) => {
    setOpen3(true);
    setSelected(i)
  }

  const handleCloseDel = () => setOpen3(false);

  const Del=async(item)=>{
    Axios.delete(`http://localhost:7000/api/recipes/delete/${selected._id}`)
    .then((res)=>{
      console.log('res',res.data);
      setCount((prev)=>!prev);
      // await handleClose2
    })
    .catch((err)=>{
      console.log(err);
    })
    await handleCloseDel()
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()

    const Data=new FormData();
    Data.append("recipeName",form.recipeName)
    Data.append("image",form.image)
    Data.append("ingredients",form.ingredients)
    Data.append("category",categState)
    Data.append("description",form.description)
    Data.append("instructions",form.instructions)
    Data.append("video",form.video)

    console.log(Data)
    Axios.post('http://localhost:7000/api/recipes/insert',Data)
    .then((result)=>{
      console.log(result.data);
      setCount((prev)=>!prev);
      setSnackbarMessage('Recipe Added successfully');
      setSnackbarOpen(true);
    })
    .catch((err)=>{
      console.log(err);
    })

    setOpen(false)
    navigate('/recipelist')
  }

  return (
    <Box sx={{ display: 'flex' }}>

      <Drawer/>
       
      {/* part that displays table */}

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        <div style={{display:'flex',justifyContent:'space-between',marginBottom:'1%'}}>
          <Typography variant="h4" gutterBottom>
            Recipe List
          </Typography>
          <Button onClick={handleOpen} variant='contained' color='inherit' ><AddIcon/>ADD RECIPE</Button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center',gap:'1%', marginBottom: '1%' }}>
          <FormControl sx={{ minWidth: 105 }}>
            <InputLabel id="category-filter" size='small'>Category</InputLabel>
            <Select
              labelId="category-filter"
              id="category-filter-select"
              value={selectedCategory}
              onChange={handleCategoryChange}
              size='small'
            >
              <MenuItem value="">All Categories</MenuItem>
              {getCategory.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div >
            <TextField
              label="Search Recipe"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearch}
              size='small'
            />
            <Button variant='contained' color='inherit' style={{border:'2px solid black'}}><SearchIcon/></Button>
          </div>
        </div>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Sl no.</StyledTableCell>
                <StyledTableCell>Recipe name</StyledTableCell>
                <StyledTableCell>Image</StyledTableCell>
                {/* <StyledTableCell>Ingredients</StyledTableCell> */}
                <StyledTableCell>Category</StyledTableCell>
                {/* <StyledTableCell>Description</StyledTableCell> */}
                {/* <StyledTableCell>Instructions</StyledTableCell> */}
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell >Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows?.map((row,index) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">{index+1}</StyledTableCell>
                  <StyledTableCell>{row.recipeName}</StyledTableCell>
                  <StyledTableCell>
                    <img src={`http://localhost:7000/uploads/recipe/${row?.image}`} alt="alt" style={{width:50,height:50,borderRadius:'15%'}} />
                  </StyledTableCell>
                  {/* <StyledTableCell>{row.ingredients}</StyledTableCell> */}
                  <StyledTableCell>{row.category_id?.name}</StyledTableCell>
                  {/* <StyledTableCell>{row.description}</StyledTableCell> */}
                  {/* <StyledTableCell>{row.instructions}</StyledTableCell> */}
                  <StyledTableCell>
                    {row?.status==="available" ? 
                      (<Chip label="available" color="success" />)
                      :
                      (<Chip label="not available" color="error" />)
                    }
                  </StyledTableCell>
                  <StyledTableCell style={{display:'flex',gap:'2%'}}>
                    <Link to={`/editrecipelist/${row?._id}`}><Button variant='contained' color='primary'><EditIcon/></Button></Link>
                    <Button variant='contained' color='success' onClick={()=>handleOpenView(row)}><VisibilityIcon/></Button>
                    <Button variant='contained' color='error' onClick={()=>handleOpenDel(row)}><DeleteIcon/></Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <br />

        <div style={{display:'flex',justifyContent:'center'}}>
          <Pagination
            count={Math.ceil(getRecipes.length / rowsPerPage)} // Calculate total number of pages
            page={page}
            onChange={handlePageChange}
            rowsPerPageOptions={[5, 10, 25]} // Customize rows per page options as needed
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleRowsPerPageChange}
          />      
        </div>
        
        <div>
          {/* enter recipe details */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div>
              <Card variant='outlined' sx={{ minWidth: 275 }}>
                <CardContent>
                  <h2 style={{marginLeft:'20%'}}><b>ENTER RECIPE DETAILS:</b></h2> 
                  <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'1%'}}>
                    <label>Recipe name:</label><TextField onChange={(e)=>Input(e)} name='recipeName' id="outlined-basic" label="recipe name" variant="outlined" />
                    <label>Category:</label>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Category:</InputLabel>
                          <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={age}
                          name="category"
                          label="Category"
                          onChange={(e)=>handleCategory(e)}
                          >
                          {getCategory?.map((item)=>{
                              return(<MenuItem value={item._id}>{item.name}</MenuItem>)
                          })}                       
                          </Select>
                      </FormControl>
                    </Box>
                    <label>Image:</label><TextField onChange={(e)=>InputImage(e)} type='file' name='image' id="outlined-basic" label="image" variant="outlined" />
                    <label>Description:</label><TextField onChange={(e)=>Input(e)} name='description' id="outlined-basic" label="description" variant="outlined" multiline rows={3}/>
                    <label>Ingredients:</label><TextField onChange={(e)=>Input(e)} name='ingredients' id="outlined-basic" label="ingredients" variant="outlined" multiline rows={4} />
                    <label>Instructions:</label><TextField onChange={(e)=>Input(e)} name='instructions' id="outlined-basic" label="instructions" variant="outlined" multiline rows={4}/>
                    <label>Video:</label><TextField onChange={(e)=>Input(e)} name='video' id="outlined-basic" label="video" variant="outlined" />
                  </div>
                </CardContent>
                <CardActions>
                  <Button onClick={handleSubmit} style={{marginLeft:'45%',marginTop:'2%'}} variant='contained'>ADD</Button>
                </CardActions>
              </Card>
              </div>
              
            </Box>
          </Modal>

          {/* delete modal card */}
          <Modal
            open={open3}
            onClose={handleCloseDel}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style2}>
            <Card>
              {/* <img width={'200px'} src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg" alt="" /> */}
                
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  do you want to delete {selected.recipeName} ?
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  
                  <Button onClick={()=>Del(selected)} variant='contained' color='error' >Delete</Button>
                  <Button onClick={handleCloseDel} variant='contained' color='inherit'>Close</Button>
                </Typography>
              </CardContent>
              
            </Card>
            </Box>
          </Modal>

          {/* view modal card */}
          <Modal
            open={open2}
            onClose={handleCloseView}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style3}>
            <Card>
              <CardContent>
              <Typography style={{display:'flex',justifyContent:'center'}} gutterBottom variant="h4" component="div">
                <b><u>VIEW RECIPE</u></b>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <span style={{display:'flex',justifyContent:'center'}}>
                  <img src={`http://localhost:7000/uploads/recipe/${selected?.image}`} alt="no image found" style={{width:'400px',height:'300px',objectFit:'cover',border:'2px solid black',padding:'1%'}} />
                </span>
                <hr />
                <h4><label style={{fontSize:'24px'}}><b style={{color:'black'}}>Recipe name:</b></label> <span style={{fontSize:'20px'}}>{selected.recipeName}</span></h4>
                <h4><label style={{fontSize:'24px'}}><b style={{color:'black'}}>Description:</b></label> <span style={{fontSize:'20px'}}>{selected.description}</span></h4>
                <h4><label style={{fontSize:'24px'}}><b style={{color:'black'}}>Category:</b></label> <span style={{fontSize:'20px'}}>{selected.category_id?.name}</span></h4>
                <h4><label style={{fontSize:'24px'}}><b style={{color:'black'}}>Ingredients:</b></label> <span style={{fontSize:'20px'}}>{selected.ingredients}</span></h4>
                <h4><label style={{fontSize:'24px'}}><b style={{color:'black'}}>Instructions:</b></label> <span style={{fontSize:'20px'}}>{selected.instructions}</span></h4>
                <h4><label style={{fontSize:'24px'}}><b style={{color:'black'}}>Video:</b></label> <span style={{fontSize:'20px'}}>
                  {/* {selected.video} */}
                  {selected?.video && (
                    <div style={{ marginTop: '1rem' }}>
                      <a
                        href={selected.video}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none', color: 'blue' }}
                      >
                        {selected?.video}
                      </a>
                    </div>
                  )}
                </span></h4>
                <div style={{display:'flex',justifyContent:'center',marginTop:'2%'}}><Button onClick={handleCloseView} variant='contained' color='inherit'>Close</Button></div>
              </Typography>
              </CardContent>
              
            </Card>
            </Box>
          </Modal>
        </div>

      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
}