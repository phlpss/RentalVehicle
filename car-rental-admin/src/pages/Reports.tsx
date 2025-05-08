import { useState, useEffect } from 'react';
import { useUser } from '../App';
import { getRevenueReport } from '../services/api';
import './Reports.css';

interface RevenueByOffice {
    officeId: string;
    officeCity: string;
    officeAddress: string;
    revenue: number;
    daysRented: number;
    carsRented: number;
    avgDaysPerCar: number;
}

interface RevenueByModel {
    brand: string;
    model: string;
    revenue: number;
    daysRented: number;
    carsRented: number;
    avgDaysPerCar: number;
}

interface RevenueReport {
    startDate: string;
    endDate: string;
    totalRevenue: number;
    totalDaysRented: number;
    avgDaysPerCar: number;
    revenueByOffice: RevenueByOffice[];
    revenueByModel: RevenueByModel[];
}

const Reports = () => {
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [startDate, setStartDate] = useState<string>(() => {
        const date = new Date();
        date.setMonth(date.getMonth() - 1);
        return date.toISOString().split('T')[0];
    });
    const [endDate, setEndDate] = useState<string>(() => {
        return new Date().toISOString().split('T')[0];
    });
    const [report, setReport] = useState<RevenueReport | null>(null);
    const [activeTab, setActiveTab] = useState<'office' | 'model'>('office');

    useEffect(() => {
        if (user?.role === 'ADMIN') {
            fetchRevenueReport();
        }
    }, [user]);

    const fetchRevenueReport = async () => {
        try {
            setLoading(true);
            const data = await getRevenueReport(startDate, endDate);
            setReport(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching revenue report:', err);
            setError('Failed to load revenue report. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetchRevenueReport();
    };

    if (user?.role !== 'ADMIN') {
        return (
            <div className="reports">
                <h1>Access Denied</h1>
                <p>You don't have permission to access this page.</p>
            </div>
        );
    }

    return (
        <div className="reports">
            <h1>Reports</h1>
            
            <div className="report-controls">
                <form onSubmit={handleSubmit} className="date-range-form">
                    <div className="form-group">
                        <label htmlFor="startDate">Start Date</label>
                        <input
                            type="date"
                            id="startDate"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="endDate">End Date</label>
                        <input
                            type="date"
                            id="endDate"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            required
                            min={startDate}
                        />
                    </div>
                    
                    <button type="submit" className="generate-button" disabled={loading}>
                        {loading ? 'Loading...' : 'Generate Report'}
                    </button>
                </form>
            </div>
            
            {error && (
                <div className="error-message">
                    {error}
                    <button className="dismiss-button" onClick={() => setError(null)}>×</button>
                </div>
            )}
            
            {report && (
                <div className="report-container">
                    <div className="report-summary">
                        <div className="summary-card">
                            <h3>Total Revenue</h3>
                            <p className="summary-value">${report.totalRevenue.toFixed(2)}</p>
                        </div>
                        
                        <div className="summary-card">
                            <h3>Total Days Rented</h3>
                            <p className="summary-value">{report.totalDaysRented}</p>
                        </div>
                        
                        <div className="summary-card">
                            <h3>Avg Days Per Car</h3>
                            <p className="summary-value">{report.avgDaysPerCar.toFixed(1)}</p>
                        </div>
                    </div>
                    
                    <div className="report-tabs">
                        <button 
                            className={`tab-button ${activeTab === 'office' ? 'active' : ''}`}
                            onClick={() => setActiveTab('office')}
                        >
                            Revenue by Office
                        </button>
                        <button 
                            className={`tab-button ${activeTab === 'model' ? 'active' : ''}`}
                            onClick={() => setActiveTab('model')}
                        >
                            Revenue by Car Model
                        </button>
                    </div>
                    
                    {activeTab === 'office' && (
                        <div className="report-table-container">
                            <table className="report-table">
                                <thead>
                                    <tr>
                                        <th>Office</th>
                                        <th>Location</th>
                                        <th>Revenue</th>
                                        <th>Days Rented</th>
                                        <th>Cars Rented</th>
                                        <th>Avg Days/Car</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {report.revenueByOffice.map((office) => (
                                        <tr key={office.officeId}>
                                            <td>{office.officeCity}</td>
                                            <td>{office.officeAddress}</td>
                                            <td>${office.revenue.toFixed(2)}</td>
                                            <td>{office.daysRented}</td>
                                            <td>{office.carsRented}</td>
                                            <td>{office.avgDaysPerCar.toFixed(1)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    
                    {activeTab === 'model' && (
                        <div className="report-table-container">
                            <table className="report-table">
                                <thead>
                                    <tr>
                                        <th>Brand</th>
                                        <th>Model</th>
                                        <th>Revenue</th>
                                        <th>Days Rented</th>
                                        <th>Cars Rented</th>
                                        <th>Avg Days/Car</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {report.revenueByModel.map((model, index) => (
                                        <tr key={index}>
                                            <td>{model.brand}</td>
                                            <td>{model.model}</td>
                                            <td>${model.revenue.toFixed(2)}</td>
                                            <td>{model.daysRented}</td>
                                            <td>{model.carsRented}</td>
                                            <td>{model.avgDaysPerCar.toFixed(1)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Reports;