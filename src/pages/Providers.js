import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { LocaleContext } from '../contexts/LocaleContext';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { FormattedDate } from 'react-intl';
import * as moment from 'moment';
 
import uuid from 'uuid';
// import { ListingsContext } from '../contexts/ListingsContext';
import firebase from '../config/firebase';

const columns = [
    { id: 'id', label: ''},
    { id: 'name', label: 'Name' },
    { id: 'provider', label: 'Provider'},
    {
        id: 'class_date',
        label: 'Date',
        minWidth: 120,
        align: 'right',
    },
    {
        id: 'class_time',
        label: 'Time',
        minWidth: 120,
        align: 'right',
    },
    {
        id: 'online',
        label: 'Online',
        minWidth: 120,
        align: 'right',
    },
    { id: 'active', label: 'Live'}
];

function createData(id, name, provider, date, online, active) {
    moment.locale('en');
    let class_date = moment(date).format("D MMM, YYYY");
    let class_time = moment(date).format("HH:mm");
    return { id, name, provider, class_date, class_time , online, active };
}
  
const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    tableWrapper: {
        marginTop: 30,
        overflow: 'auto',
    },
});


function useListings() {
    const [times, setTimes] = useState([]);
   
    useEffect(() => {
        const unsubscribe = firebase.firestore().collection('listings').orderBy('date', 'desc').onSnapshot((snapshot) => {
            const newListings = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setTimes(newListings);
        });
        return () => unsubscribe();

    }, [])

    return times;
}

function deleteListings(listings) {
    listings.forEach((listing) => {
        firebase.firestore().collection('listings').doc(listing).delete();
        console.log("Deleted " + listing);
    });
    return true;
}

function activateListings(listings) {
    listings.forEach((listing) => {
        firebase.firestore().collection('listings').doc(listing).update({
            "active": true
        });
    });
    return true;
}

function deactivateListings(listings) {
    listings.forEach((listing) => {
        firebase.firestore().collection('listings').doc(listing).update({
            "active": false
        });
    });
    return true;
}

const Providers = () => {
    const listings = useListings();
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isListingSelected, setIsListingSelected] = useState(false);
    const [listingsSelected, setListingsSelected] = useState([]);
    let rows;
    if(listings!=null && listings.length > 0) {
        rows = listings.map((classEntry) => {
            return(
                createData(
                    classEntry.id,
                    classEntry.listingName,
                    classEntry.companyName,
                    classEntry.date,
                    classEntry.online,
                    classEntry.active ? "true": "false"
            ));
        });
    } else {
        rows = []; 
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const listingSelected = event => {
        const listingId = event.target.value;
        console.log("Selected: " + listingId);
        setIsListingSelected(true);
        setListingsSelected(() => {
            console.log("Checking if " + listingId + " in " + listingsSelected);
            if (listingsSelected.includes(listingId)) {
                console.log(listingId + " already in list, removing it");
                const newList = listingsSelected.filter(item => item!=listingId);
                if (newList.length<1) { setIsListingSelected(false)}
                return newList;
            } else {
                console.log(listingId + " not in list, adding it");
                return [...listingsSelected, listingId];
            }
        });
        console.log(listingsSelected);
    }

    const deleteSelectedListings = () => {
        let result = false;
        result = deleteListings(listingsSelected);
        if (result) {
            setIsListingSelected(false);
        }
    }

    const activateSelectedListings = () => {
        let result = false;
        result = activateListings(listingsSelected);
        if (result) {
            console.log("activated listing, removing it from list");
            setListingsSelected([]);
            setIsListingSelected(false);
        }
    }

    const deactivateSelectedListings = () => {
        let result = false;
        result = deactivateListings(listingsSelected);
        if (result) {
            console.log("deactivated listing, removing it from list");
            setListingsSelected([]);
            setIsListingSelected(false);
        }
    }

    return(<LocaleContext.Consumer>{(context) => {
            const locale = context.locale;
            return(
                <Container className="main-content">
                    <Grid container className="contact-form">
                        <Grid item xs={12} sm={12} >
                            <h2>
                                Classes
                            </h2>           
                            <div>
                                <Link to={{pathname:`/${locale.split('-')[0]}/providers/new`}}>
                                    <Button variant="contained" className="primary  "><Icon>
                                            add
                                            </Icon>
                                            &nbsp;New
                                    </Button>
                                </Link>
                                <Button 
                                    disabled={!isListingSelected && listingsSelected.length<1} 
                                    variant="outlined" 
                                    className="delete-class-btn" 
                                    onClick={()=> {
                                        activateSelectedListings()
                                    }}
                                >
                                    <Icon>
                                        visibility
                                    </Icon>
                                    &nbsp;Activate
                                </Button>
                                <Button 
                                    disabled={!isListingSelected && listingsSelected.length<1} 
                                    variant="outlined" 
                                    className="delete-class-btn" 
                                    onClick={()=> {
                                        deactivateSelectedListings()
                                    }}
                                >
                                    <Icon>
                                        visibility_off
                                    </Icon>
                                    &nbsp; Deactivate
                                </Button>
                                <Button 
                                    disabled={!isListingSelected && listingsSelected.length<1} 
                                    variant="outlined" 
                                    className="delete-class-btn" 
                                    onClick={()=> {
                                        var confirm = window.confirm("Are you sure?");
                                        if (confirm) {
                                            deleteSelectedListings()
                                        }
                                    }}
                                >
                                    <Icon>
                                        delete_outlined
                                        </Icon>
                                        &nbsp;Delete
                                </Button>
                            </div>

                            <div className={classes.tableWrapper}>
                              <Table>
                                <TableHead>
                                  <TableRow>
                                    {columns.map(column => (
                                      <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                      >
                                        {column.label}
                                      </TableCell>
                                    ))}
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                                    return (
                                      <TableRow hover role="checkbox" tabIndex={-1} key={uuid()}>
                                        {columns.map(column => {
                                            let value = null;
                                            if (column.id == "active") {
                                                value = (row[column.id  ]==="true") ? 
                                                    <Icon style={{color: '#2DE080'}}>visibility</Icon>
                                                    :
                                                    <Icon style={{color: '#eaeaea'}}>visibility_off</Icon>;
                                            } else if (column.id !=="id") {
                                                value = row[column.id];
                                            } else {
                                                value = <input checked={listingsSelected.includes(row[column.id])} type="checkbox" name={row[column.id]} value={row[column.id]} onChange={listingSelected} />
                                            }
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                {value}
                                                </TableCell>
                                            );
                                        })}
                                      </TableRow>
                                    );
                                  })}
                                </TableBody>
                              </Table>
                            </div>
                            <TablePagination
                              rowsPerPageOptions={[10, 25, 100]}
                              component="div"
                              count={rows.length}
                              rowsPerPage={rowsPerPage}
                              page={page}
                              backIconButtonProps={{
                                'aria-label': 'previous page',
                              }}
                              nextIconButtonProps={{
                                'aria-label': 'next page',
                              }}
                              onChangePage={handleChangePage}
                              onChangeRowsPerPage={handleChangeRowsPerPage}
                            />                            
                           
                        </Grid>
                    </Grid>
                    <br/>
                </Container>)}}</LocaleContext.Consumer>
        );
}

export default Providers; 