import React, { useEffect, useState } from 'react';
import "./Dashboard.css"
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Dashboard() {
  const [segments, setSegments] = useState([]);

  useEffect(() => {
    const fetchSegments = async () => {
      const { data: segments, error } = await supabase
        .from('segment_master')
        .select('*')
        .eq('activestatus', 'Y'); // Filter active segments

      if (error) {
        console.error('Error fetching segments:', error.message);
      } else {
        setSegments(segments);
      }
    };

    fetchSegments();
  }, []);

  const totalColumns = ['2023', '2024', 'Jun', 'July'];
  const totalValues = totalColumns.map(col => segments.reduce((acc, segment) => acc + segment.segmentid, 0));
  const naValues = Array(totalColumns.length).fill("N/A");

  return (
    <main id='main' className='main'>
      <h2><center>Purchase Analysis (Litres)</center> </h2>
      <h4>Segmentwise : </h4>
      <table className="segment-table">
        <thead>
          <tr>
            <th><center>Year</center></th>
            {totalColumns.map((col, index) => <th key={index}><center>{col}</center></th>)}
          </tr>
        </thead>
        <tbody>
          {segments.map((segment, index) => (
            <tr key={index}>
              <td><center>{segment.segmentname.trim()}</center></td>
              {totalColumns.map((_, i) => (
                <td key={i}><center>{segment.segmentid}</center></td>
              ))}
            </tr>
          ))}
          <tr>
            <td><center>Total</center></td>
            {totalValues.map((val, i) => <td key={i}><center>{val}</center></td>)}
          </tr>
          <tr>
            <td><center>NA</center></td>
            {naValues.map((val, i) => <td key={i}><center>{val}</center></td>)}
          </tr>
        </tbody>
      </table>
      <h4>TurnOver Segmentwise :</h4>
      <table className="segment-table">
        <thead>
          <tr>
            <th><center>Year</center></th>
            {totalColumns.map((col, index) => <th key={index}><center>{col}</center></th>)}
          </tr>
        </thead>
        <tbody>
          {segments.map((segment, index) => (
            <tr key={index}>
              <td><center>{segment.segmentname.trim()}</center></td>
              {totalColumns.map((_, i) => (
                <td key={i}><center>{segment.segmentid}</center></td>
              ))}
            </tr>
          ))}
          <tr>
            <td><center>Total</center></td>
            {totalValues.map((val, i) => <td key={i}><center>{val}</center></td>)}
          </tr>
          <tr>
            <td><center>NA</center></td>
            {naValues.map((val, i) => <td key={i}><center>{val}</center></td>)}
          </tr>
        </tbody>
      </table>
      <h4>DSR Summary of the Day :</h4>
      <table className="segment-table">
        <thead>
          <tr>
            <th><center>Year</center></th>
            {totalColumns.map((col, index) => <th key={index}><center>{col}</center></th>)}
          </tr>
        </thead>
        <tbody>
          {segments.map((segment, index) => (
            <tr key={index}>
              <td><center>{segment.segmentname.trim()}</center></td>
              {totalColumns.map((_, i) => (
                <td key={i}><center>{segment.segmentid}</center></td>
              ))}
            </tr>
          ))}
          <tr>
            <td><center>Total</center></td>
            {totalValues.map((val, i) => <td key={i}><center>{val}</center></td>)}
          </tr>
          <tr>
            <td><center>NA</center></td>
            {naValues.map((val, i) => <td key={i}><center>{val}</center></td>)}
          </tr>
        </tbody>
      </table>
    </main>
  )
}
