import React, { useState, useEffect, useContext, useRef } from 'react';
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
import { FormattedMessage } from 'react-intl';
import { AuthContext } from '../contexts/AuthContext';

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
        label: 'Where',
        minWidth: 120,
        align: 'right',
    },
    { id: 'uid', label: 'UID'},
    { id: 'addedBy', label: 'Added by'},
    { id: 'active', label: 'Status', align: 'center'},   
    { id: 'edit', label: 'Edit'}
];

function createData(id, name, provider, date, online, city, uid, addedBy, active) {
    moment.locale('en');
    let class_date = "---";
    let class_time = "---";
    if (date !== null && typeof date === 'object') {
        let jsDate = new Date(date.seconds * 1000);
        class_date = moment(jsDate).format("D MMM, YYYY");
        class_time = moment(jsDate).format("HH:mm");
    }
    return { id, name, provider, uid, class_date, class_time , online, city, addedBy, active };
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

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)   // General scroll to element function

function useListings() {
    const { currentUser } = useContext(AuthContext);
    const [listings, setListings] = useState([]);
    useEffect(() => {
        let unsubscribe;
        if(currentUser.email.indexOf('parentica') !== -1) {
            unsubscribe = firebase.firestore()
                .collection('listings')
                // .where()
                .orderBy('date', 'desc')
                .onSnapshot((snapshot) => {
                const newListings = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setListings(newListings);
            });
        } else {
            unsubscribe = firebase.firestore()
                .collection('listings')
                .where('addedBy', '==', currentUser.email)
                .orderBy('date', 'desc')
                .onSnapshot((snapshot) => {
                const newListings = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setListings(newListings);
            });
        }
        return () => unsubscribe();

    }, [])

    return listings;
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
    return true
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
    const { currentUser } = useContext(AuthContext);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(100);
    const [isListingSelected, setIsListingSelected] = useState(false);
    const [listingsSelected, setListingsSelected] = useState([]);
    let rows;

    const executeScroll = () => scrollToRef(myRef)

    if(listings!=null && listings.length > 0) {
        rows = listings.map((classEntry) => {
            let title = (classEntry.hasOwnProperty("listingName") ? 
                classEntry.listingName
                :
                classEntry.listingTitle
            )
            let date = (classEntry.date != null) ? classEntry.date : "";
            let addedBy = (classEntry.hasOwnProperty('addedBy')) ? classEntry.addedBy : null;
            return(
                createData(
                    classEntry.id,
                    title,
                    classEntry.companyName,
                    date,
                    classEntry.online,
                    classEntry.city,
                    classEntry.id.substring(0,4) + '...',
                    addedBy,
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
                const newList = listingsSelected.filter(item => item!==listingId);
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

    const showField = (fieldId) => {
        // Hide table column for non-admins, returns true if admin
        const adminOnlyColumns = ['uid', 'addedBy', 'provider', 'online'];    
        return !(adminOnlyColumns.includes(fieldId)) 
            || (adminOnlyColumns.includes(fieldId) && currentUser.email.indexOf('parentica')!==-1);
    }

    const { locale } = useContext(LocaleContext);
    
    const myRef = useRef(null)
    // let myRef = React.createRef();

    // console.log(currentUser);
    return(
        <Container className="content">
                    <Grid container className="contact-form">
                        <Grid item xs={12} sm={12} >
                            <h2>
                                <FormattedMessage id={`navbar.listings.link.${locale}`} />
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
                                        toggle_on
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
                                        toggle_off
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
                                        (showField(column.id)) ? 
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
                                            >
                                                {column.label}
                                            </TableCell>
                                            : 
                                            null
                                    ))}
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                                    let today = new Date();
                                    return (
                                      <TableRow hover role="checkbox" tabIndex={-1} key={row['id']} ref={myRef}>
                                        {columns.map(column => {
                                            let value = null;
                                            if (column.id === "active") {
                                                value = (row[column.id]==="true") ? 
                                                    (new Date(row["class_date"]) > today || row["class_date"] === "---" ) ?
                                                        <Icon 
                                                            onClick={() => {
                                                                deactivateListings([row['id']]);
                                                                // executeScroll();
                                                                // window.scrollTo(0, position);
                                                                // .scrollIntoView({ behavior: 'smooth', block: 'start' })
                                                            }}
                                                            style={{color: '#2DE080', cursor:'pointer'}}>
                                                            visibility
                                                        </Icon>
                                                        :
                                                        <span style={{color: '#999999'}}>past</span>
                                                    :
                                                    <Icon 
                                                        onClick={() => {
                                                            activateListings([row['id']]);
                                                            // window.scrollTo(0, myRef.current.offsetTop);
                                                        }}
                                                        style={{color: '#999999', cursor:'pointer'}}>
                                                        visibility_off
                                                    </Icon>;
                                            } else if (column.id === "edit") {
                                                value = <Icon 
                                                            onClick={() => {
                                                                console.log(row['id'] + " edited");
                                                                // setListingsSelected([row['id']]);
                                                                // console.log([row['id']] + " added: " + listingsSelected);
                                                                // deactivateListings([row['id']]);
                                                            }}
                                                            style={{color: '#999999', cursor:'pointer'}}>
                                                            edit
                                                        </Icon>;
                                            } else if (column.id === "online") {
                                                value = (!row["online"]) ? 
                                                    row.city 
                                                    : 
                                                    "online";
                                            } else if (column.id !== "id") {
                                                value = row[column.id];
                                            } else {
                                                value = <input 
                                                            checked={listingsSelected.includes(row[column.id])} 
                                                            type="checkbox" 
                                                            name={row[column.id]} 
                                                            value={row[column.id]} 
                                                            onChange={listingSelected} />
                                            }
                                            return (
                                                (showField(column.id)) ? 
                                                    <TableCell key={column.id} align={column.align}>
                                                    {value}
                                                    </TableCell>
                                                    :
                                                    null
                                            );
                                        })}
                                      </TableRow>
                                    );
                                  })}
                                </TableBody>
                              </Table>
                            </div>
                            <TablePagination
                              rowsPerPageOptions={[25, 50, 100]}
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
                </Container>
            );
}

export default Providers; 