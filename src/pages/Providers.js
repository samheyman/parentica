import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { FormattedMessage } from 'react-intl';
import { LocaleContext } from '../contexts/LocaleContext';
import Spinner from 'react-spinner-material';
import clsx from 'clsx';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { FormattedDate } from 'react-intl';

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
    let class_date = <FormattedDate
                        value={date}
                        day="2-digit"
                        month="2-digit"
                    />;
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
    const classes = useStyles();
    const classesList = props.classes;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const rows = classesList.map((classEntry) => {
        return(
            createData(
                classEntry.id,
                classEntry.className,
                classEntry.companyName,
                new Date(classEntry.date),
                classEntry.price
        ));
    });

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
                                      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
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