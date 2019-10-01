import React, { useContext, useState, useEffect } from 'react';
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
import { FirebaseContext } from '../contexts/FirebaseContext';
import * as moment from 'moment';
import uuid from 'uuid';

const columns = [
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
    let class_date = moment(date).format("MMM D");
    let class_time = <FormattedDate
                        value={date}
                        hour="2-digit"
                        minute="2-digit"
                    />;
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

function Providers(props) {
    const firebase = useContext(FirebaseContext);
    const [listings, setListings] = useState(null);
    const ref = firebase.firestore().collection(`listings`);
    const classes = useStyles();

    useEffect(() => {
        ref.get().then(snapshot => {
            if (!snapshot) {
                setListings(l => [])
            } else {
                let items = []
                snapshot.forEach(item => {
                items.push({ key: item.id, ...item.data() })
                })
                setListings(l => items)
            }
        }).catch(error => {
            console.log("Error: " + error);
        })
    }, []);

    // let listingsToDispay;
    // if (listings === null) {
    //     listToDisplay = (<li>Loading shirts...</li>)
    // } else if (listings.length === 0) {
    //     listToDisplay = [];
    // } else {
    //     listToDisplay = listings.map(shirt => {
    //     return (<li key={ shirt.key }>{ shirt.name }</li>)
    //     })
    // }

    // const { listings } = useContext(ListingsContext);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    // const rows = [];

    let rows;
    if(listings!=null && listings.length > 0) {
        rows = listings.map((classEntry) => {
            return(
                createData(
                    classEntry.id,
                    classEntry.className,
                    classEntry.companyName,
                    new Date(classEntry.date),
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
                                          const value = row[column.id];
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