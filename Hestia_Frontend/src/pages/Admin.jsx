import Lock from "../Components/Lock"
import AuthContext from '../context/AuthContext';
import TotalPointsContext from "../context/TotalPointsContext"
import HamburgerMenu from "../Components/Menu";
import Button from '@mui/material/Button';
import { useContext, useState, useEffect } from "react";
import socket from "../Utils/socket"
import RaffleModal from "../Components/RaffleModal"
import { Bar } from 'react-chartjs-2';
import axios from "axios"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
const API_URL = import.meta.env.VITE_API_URL;



const AdminPage = () => {
    const {isAdmin} = useContext(AuthContext)
    const {context} = useContext(TotalPointsContext)
    const [earnedPoints, setEarnedPoints] = useState(0)
    const [spentPoints, setSpentPoints] = useState(0)
    const [unusedPoints, setUnusedPoints] = useState(0)
    const [pointsDataArr, setPointsDataArr] = useState(0)
    const [vendorStats, setVendorStats] = useState([])
    const [totalUsers, setTotalUsers] = useState(0)
    const [totalPurchases, setTotalPurchases] = useState(0)


    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
      );

      useEffect(() => {
        const fetchAllEarnedPoints = async () => {
          try{
            const res = await axios.get(`${API_URL}/api/admin/allEarned`)
            const earnedPointsData = res?.data
            setEarnedPoints(earnedPointsData)
          } catch(e) {
            console.log("couldn't fetch points")
          }
        }
  
        fetchAllEarnedPoints();
       }, [])

       useEffect(() => {
        const fetchAllSpentPoints = async () => {
          try{
            const res = await axios.get(`${API_URL}/api/admin/allSpent`)
            const spentPointsData = Math.abs(res?.data)
            setSpentPoints(Math.abs(spentPointsData))
          } catch(e) {
            console.log("couldn't fetch points")
          }
        }
  
        fetchAllSpentPoints();
       }, [])

       useEffect(() => {
        const fetchAllUnusedPoints = async () => {
          try{
            const res = await axios.get(`${API_URL}/api/admin/allUnused`)
            setUnusedPoints(Math.abs(res?.data)) 
          } catch(e) {
            console.log("couldn't fetch points")
          }
        }
  
        fetchAllUnusedPoints();
       }, [])


       useEffect(() => {
        const fetchAllUsers = async () => {
          try{
            const res = await axios.get(`${API_URL}/api/admin/allUsers`)
            const totalUsersData = res?.data.totalUsers[0].count
            setTotalUsers(totalUsersData)
          } catch(e) {
            console.log("couldn't fetch users")
          }
        }

        fetchAllUsers()
      })

      
        useEffect(() => {
            const fetchStats = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/admin/stats`);
                const data = res.data.map((vendor) => ({
                vendor: vendor.vendor_id,
                redemptions: Number(vendor.total_redemptions),
                freeRedemptions: Number(vendor.total_free_redemptions),
                profit: Number(vendor.total_cost_after_discounts),
                business_name: vendor.business_name
                }));
                setVendorStats(data);
            } catch (err) {
                console.error("Error fetching vendor stats:", err);
            }
            };

            fetchStats();
        }, []);

    const pointsLabels = ['unused', 'spent', 'earned'];

    useEffect( () =>{
        const pointsDataArr = [unusedPoints, spentPoints, earnedPoints]
        setPointsDataArr(pointsDataArr)
    }, [unusedPoints, spentPoints, earnedPoints])
    
    const pointsOptions = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Points Data',
          },
        },
      };

      const pointsData = {
        labels: pointsLabels,
        datasets: [
          {
            label: 'Points',
            data: pointsDataArr,
            backgroundColor: 'rgba(255, 14, 0, 1)',
          }
        ],
      };

      const chartData = {
        labels: vendorStats.map((v) => v.business_name),
        datasets: [
          {
            label: "Total Redemptions",
            data: vendorStats.map((v) => v.redemptions),
            backgroundColor:" rgba(255, 14, 0, 1)",
          },
          {
            label: "Free Redemptions",
            data: vendorStats.map((v) => v.freeRedemptions),
            backgroundColor: "rgba(255, 140, 0, 1)",
          },
        ],
      };
    
      const chartOptions = {
        responsive: true,
        plugins: {
          legend: { position: "top" },
          title: { display: true, text: "Vendor Redemptions" },
        },
        scales: {
          y: { beginAtZero: true },
        },
      };

 return(
    <>
    {
        isAdmin ?
         
         <div style={containerStyle1}>
            <HamburgerMenu />

             <div style={{textAlign: "center"}}>
                <h2 style={{fontSize: 30}}>Data Tracking</h2>

                <div style={{margin:10}} >
                    <h3 style={{margin:0}}>Registered Users</h3>
                    <p style={{margin:0, fontSize: 24}}>{totalUsers}</p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <h3 style={{margin:2}}>Total Purchases</h3>
                    {vendorStats.map((vendor) => (
                        <div 
                        key={vendor.vendor} 
                        style={{
                            display: "flex", 
                            justifyContent: "space-between", 
                            padding: "10px", 
                            border: "1px solid #ccc", 
                            borderRadius: "5px",
                        }}
                        >
                        <p style={{ margin: 0, fontWeight: "bold" }}>{vendor.business_name}: &ensp; </p>
                        <p style={{ margin: 0 }}>${vendor.profit.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            </div>
             
            <div style={{ 
                border: "3px, solid, rgba(255, 140, 0, 1)",
                borderRadius: 5,
                display: "flex",
                color: "black",
                flexDirection: 'column',
                alignItems: "center",
                gap: "2em",
                padding: 20
                }}>
            
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Bar
                options={pointsOptions}
                data={pointsData}
            />
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Bar data={chartData} options={chartOptions} />
            </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <RaffleModal 
                disabled={context.isGoalReached} 
                />
            </div>

        </div>
           
         :
         <div>
             <Lock />
         </div>
      }
      </>
 )
}

const containerStyle1 = {
    position: "relative",
    width: "100%",
    overflowX: "hidden",
    margin: "0",
    display: "flex",
    color: "black",
    flexDirection: 'column',
    alignItems: "center",
    gap: "2em"
  };
 

export default AdminPage