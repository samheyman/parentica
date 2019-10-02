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
    { id: 'name', label: 'Class name' },
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
        id: 'price',
        label: 'Price',
        minWidth: 120,
        align: 'right',
        format: value => value.toFixed(2),
    },
];

function createData(id, name, provider, date, price) {
    console.log(typeof(date) + " -- " + date);
    let class_date = moment(date).format("MMM D");
    let class_time = moment(date).format("HH:mm");
    return { id, name, provider, class_date, class_time , price };
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
    // TODO add unsubscribe callback!
    const [times, setTimes] = useState([]);
   
    useEffect(() => {
        const unsubscribe = firebase.firestore().collection('listings').onSnapshot((snapshot) => {
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

const Providers = () => {
    const listings = useListings();
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    let rows;
    if(listings!=null && listings.length > 0) {
        rows = listings.map((classEntry) => {
            return(
                createData(
                    classEntry.id,
                    classEntry.listingName,
                    classEntry.companyName,
                    classEntry.date,
                    classEntry.price
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
                                <Button disabled variant="outlined" className="secondary " ><Icon>
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
                                            const value = (column.id !=="id") ? 
                                                row[column.id] 
                                                : 
                                                <input type="checkbox" name={row[column.id]} value={row[column.id]}/>
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