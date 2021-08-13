import React from 'react';
import ColumnFilter from './ColumnFilter';

 export const COLUMNS = [
     {
        Header:'Id',
        Footer:"Id",
        accessor:'id',
        disableFilters:true
     },
     {
        Header:'First Name',
        Footer:"First Name",
        accessor:'first_name',
       
     },
     {
        Header:'Last Name',
        Footer:"Last Name",
        accessor:'last_name',
        
     },
     {
        Header:'Email',
        Footer:"Email",
        accessor:'email',
     },
     {
        Header:'Age',
        Footer:"Age",
        accessor:'age',
     },
     
 ]

 export const GROUPED_COLUMNS = [
   {
      Header:'Id',
      Footer:"Id",
      accessor:'id' 
   },
   {
      Header:'Name',
      Footer:"Name",
      columns:[
         {
            Header:'First Name',
            Footer:"First Name",
            accessor:'first_name' 
         },
         {
            Header:'Last Name',
            Footer:"Last Name",
            accessor:'last_name'  
         },
      ]
   },
   {
      Header:'Info',
      Footer:'Info',
      columns:[
         {
            Header:'Email',
            Footer:"Email",
            accessor:'email'  
         },
         {
            Header:'Age',
            Footer:"Age",
            accessor:'age'  
         },
      ]
   }
 ]