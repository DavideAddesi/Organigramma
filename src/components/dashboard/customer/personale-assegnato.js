import { useEffect, useState } from 'react';
import NextLink from 'next/link';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { ArrowRight as ArrowRightIcon } from '../../../icons/arrow-right';
import { PencilAlt as PencilAltIcon } from '../../../icons/pencil-alt';
import { getInitials } from '../../../utils/get-initials';
import { Scrollbar } from '../../scrollbar';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const tabs = [
  {
    label: 'All',
    value: 'all'
  },
  {
    label: 'Accepts Marketing',
    value: 'hasAcceptedMarketing'
  },
  {
    label: 'Prospect',
    value: 'isProspect'
  },
  {
    label: 'Returning',
    value: 'isReturning'
  }
];

const sortOptions = [
  {
    label: 'Last update (newest)',
    value: 'updatedAt|desc'
  },
  {
    label: 'Last update (oldest)',
    value: 'updatedAt|asc'
  },
  {
    label: 'Total orders (highest)',
    value: 'orders|desc'
  },
  {
    label: 'Total orders (lowest)',
    value: 'orders|asc'
  }
];

const applyFilters = (customers, filters) => customers.filter((customer) => {
  if (filters.query) {
    let queryMatched = false;
    const properties = ['email', 'name'];

    properties.forEach((property) => {
      if (customer[property].toLowerCase().includes(filters.query.toLowerCase())) {
        queryMatched = true;
      }
    });

    if (!queryMatched) {
      return false;
    }
  }

  if (filters.hasAcceptedMarketing && !customer.hasAcceptedMarketing) {
    return false;
  }

  if (filters.isProspect && !customer.isProspect) {
    return false;
  }

  if (filters.isReturning && !customer.isReturning) {
    return false;
  }

  return true;
});

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }

  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
};

const getComparator = (order, orderBy) => (order === 'desc'
  ? (a, b) => descendingComparator(a, b, orderBy)
  : (a, b) => -descendingComparator(a, b, orderBy));

const applySort = (customers, sort) => {
  const [orderBy, order] = sort.split('|');
  const comparator = getComparator(order, orderBy);
  const stabilizedThis = customers.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
        const newOrder = comparator(a[0], b[0]);

    if (newOrder !== 0) {
      return newOrder;
    }

        return a[1] - b[1];
  });

    return stabilizedThis.map((el) => el[0]);
};

const applyPagination = (customers, page, rowsPerPage) => customers.slice(page * rowsPerPage,
  page * rowsPerPage + rowsPerPage);


export const PersonaleAssegnato = (props) => {
  const {
    personale,
    ...other
  } = props;


  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sort, setSort] = useState(sortOptions[0].value);
  const [filters, setFilters] = useState({
    query: '',
    hasAcceptedMarketing: null,
    isProspect: null,
    isReturning: null
  });

  const handleTabsChange = (event, value) => {
    const updatedFilters = {
      ...filters,
      hasAcceptedMarketing: null,
      isProspect: null,
      isReturning: null
    };

    if (value !== 'all') {
      updatedFilters[value] = true;
    }

    setFilters(updatedFilters);
    setCurrentTab(value);
  };

  const handleQueryChange = (event) => {
    event.preventDefault();
    setFilters((prevState) => ({
      ...prevState,
      query: queryRef.current?.value
    }));
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  // Usually query is done on backend with indexing solutions
  const filteredCustomers = applyFilters(personale, filters);
  const sortedCustomers = applySort(filteredCustomers, sort);
  const paginatedCustomers = applyPagination(sortedCustomers, page, rowsPerPage);

  // Reset selected customers when customers change
  useEffect(() => {
      if (selectedCustomers.length) {
        setSelectedCustomers([]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [personale]);

  const handleSelectAllCustomers = (event) => {
    setSelectedCustomers(event.target.checked
      ? personale.map((customer) => customer.id)
      : []);
  };

  const handleSelectOneCustomer = (event, customerId) => {
    if (!selectedCustomers.includes(customerId)) {
      setSelectedCustomers((prevSelected) => [...prevSelected, customerId]);
    } else {
      setSelectedCustomers((prevSelected) => prevSelected.filter((id) => id !== customerId));
    }
  };

  const enableBulkActions = selectedCustomers.length > 0;
  const selectedSomeCustomers = selectedCustomers.length > 0
    && selectedCustomers.length < personale.length;
  const selectedAllCustomers = selectedCustomers.length === personale.length;

  const color = (stato) =>{
    if(stato==1) return "#008450"
    if(stato==2) return "#EFB700"
    if(stato==3) return "#B81D13"
  }

  return (
    <div {...other}>
    
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead sx={{ visibility: enableBulkActions ? 'collapse' : 'visible' }}>
            <TableRow>
              <TableCell>
                Nome
              </TableCell>
              <TableCell>
                Ruolo
              </TableCell>
              <TableCell>
                Ufficio
              </TableCell>
              <TableCell>
                Sede
              </TableCell>   
              <TableCell>
                CDO
              </TableCell>
              <TableCell>
                Email
              </TableCell>
              <TableCell>
                Tel/Cell
              </TableCell>

              {/* <TableCell align="right">
                Azioni
              </TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {personale.map((persona) => {
              // const isCustomerSelected = selectedCustomers.includes(persona.id);

              return (
                <TableRow
                  hover
                  key={persona.id}
                  // selected={isCustomerSelected}
                >
                  
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={"https://randomuser.me/api/portraits/women/"+randomIntFromInterval(1,100)+".jpg"}
                        sx={{
                          height: 42,
                          width: 42
                        }}
                      >
                        {getInitials(persona.name)}
                      </Avatar>
                      <Box sx={{ ml: 1 }}>
                        
                      </Box>
                      <Box sx={{ ml: 1, display: 'flex', alignItems: 'center', gap: "10px" }}>
                      <FiberManualRecordIcon sx={{color: color(persona.stato)}} />
                        <NextLink
                          href="#"
                          passHref
                        >
                          <Link
                            color="inherit"
                            variant="subtitle2"
                          >
                            {persona.nome}
                          </Link>
                        </NextLink>
                      </Box>
                    </Box>
                  </TableCell>
               
                  <TableCell>
                    {persona.ruolo}
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="subtitle2"
                    >
                      {persona.ufficio}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {persona.sede}
                  </TableCell>
                  <TableCell>
                  {`${persona.CDO}`}
                  </TableCell>
                  <TableCell>
                    {persona.email}
                  </TableCell>
                  <TableCell>
                    {persona.tel}
                  </TableCell>
                  {/* <TableCell align="right">
                    <NextLink
                      href="/dashboard/customers/1/edit"
                      passHref
                    >
                      <IconButton component="a">
                        <PencilAltIcon fontSize="small" />
                      </IconButton>
                    </NextLink>
                    <NextLink
                      href="/dashboard/customers/1"
                      passHref
                    >
                      <IconButton component="a">
                        <ArrowRightIcon fontSize="small" />
                      </IconButton>
                    </NextLink>
                  </TableCell> */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={personale.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

