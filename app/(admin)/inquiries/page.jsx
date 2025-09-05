// app/(admin)/inquiries/page.jsx

"use client";
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Search, FileText, Activity, CheckCircle, Download } from 'lucide-react';
import InquiryRow from '@/components/admin/InquiryRow';
import InquiryModal from '@/components/admin/InquiryModal';
import ConfirmDeleteModal from '@/components/admin/ConfirmDeleteModal';
import { Toaster, toast } from 'sonner';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white p-5 rounded-lg shadow-sm flex items-center gap-4 border border-slate-200/80">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color.bg}`}>
            {icon}
        </div>
        <div>
            <p className="text-sm text-slate-500">{title}</p>
            <p className="text-2xl font-bold text-slate-800">{value}</p>
        </div>
    </div>
);

const ITEMS_PER_PAGE = 10;

export default function InquiriesPage() {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [inquiryToDelete, setInquiryToDelete] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const fetchInquiries = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/inquiries');
            if (response.ok) {
                const data = await response.json();
                setInquiries(data);
            } else {
                toast.error('Failed to fetch inquiries.');
            }
        } catch (error) {
            toast.error('An error occurred while fetching inquiries.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchInquiries();
    }, [fetchInquiries]);

    const handleStatusUpdate = async (id, status) => {
        const originalInquiries = [...inquiries];
        setInquiries(prev => prev.map(inq => inq._id === id ? { ...inq, status } : inq));

        try {
            const response = await fetch(`/api/inquiries/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            });
            if (!response.ok) {
                setInquiries(originalInquiries);
                toast.error('Failed to update status.');
            } else {
                toast.success(`Inquiry status updated to ${status}.`);
            }
        } catch (error) {
            setInquiries(originalInquiries);
            toast.error('An error occurred while updating status.');
        }
    };

    const handleDelete = (id) => {
        setInquiryToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!inquiryToDelete) return;
        setIsDeleting(true);
        try {
            const response = await fetch(`/api/inquiries/${inquiryToDelete}`, { method: 'DELETE' });
            if (response.ok) {
                toast.success('Inquiry deleted successfully.');

                // FIX: Check if the current page will be empty after deletion
                const newTotalInquiries = filteredInquiries.length - 1;
                const newTotalPages = Math.ceil(newTotalInquiries / ITEMS_PER_PAGE);

                if (currentPage > newTotalPages && newTotalPages > 0) {
                    setCurrentPage(newTotalPages);
                }
                
                // Update the state *after* the check
                setInquiries(prev => prev.filter(inq => inq._id !== inquiryToDelete));

            } else {
                toast.error('Failed to delete inquiry.');
            }
        } catch (error) {
            toast.error('An error occurred while deleting.');
        } finally {
            setIsDeleting(false);
            setIsDeleteModalOpen(false);
            setInquiryToDelete(null);
        }
    };
    
    const handleViewDetails = async (inquiry) => {
        setSelectedInquiry(inquiry);
        setIsModalOpen(true);
        if (!inquiry.isRead) {
            try {
                const response = await fetch(`/api/inquiries/${inquiry._id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ isRead: true }),
                });
                if (response.ok) {
                    setInquiries(prev => prev.map(i => i._id === inquiry._id ? { ...i, isRead: true } : i));
                }
            } catch (error) {
                console.error("Failed to mark as read:", error);
            }
        }
    };
    
    const handleAddRemark = async (id, remark) => {
        try {
            const response = await fetch(`/api/inquiries/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ remark }),
            });
            if (response.ok) {
                const updatedInquiry = await response.json();
                setInquiries(prev => prev.map(i => i._id === id ? updatedInquiry : i));
                setSelectedInquiry(updatedInquiry);
                toast.success('Remark added successfully.');
                return true;
            } else {
                toast.error('Failed to add remark.');
                return false;
            }
        } catch (error) {
            toast.error('An error occurred while adding remark.');
            return false;
        }
    };

    const filteredInquiries = useMemo(() =>
        inquiries.filter(inq =>
            inq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inq.email.toLowerCase().includes(searchTerm.toLowerCase())
        ), [inquiries, searchTerm]);

    const paginatedInquiries = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredInquiries.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredInquiries, currentPage]);

    const totalPages = Math.ceil(filteredInquiries.length / ITEMS_PER_PAGE);

    const stats = useMemo(() => {
        return inquiries.reduce((acc, curr) => {
            if (curr.status === 'Pending') acc.pending++;
            else if (curr.status === 'Follow Up') acc.followUp++;
            else if (curr.status === 'Complete') acc.complete++;
            return acc;
        }, { pending: 0, followUp: 0, complete: 0 });
    }, [inquiries]);

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredInquiries.map(
            ({ name, email, phone, state, status, createdAt }) => ({
                Name: name, Email: email, Phone: phone, State: state, Status: status,
                Date: new Date(createdAt).toLocaleDateString()
            })
        ));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Inquiries");
        XLSX.writeFile(workbook, "inquiries.xlsx");
        toast.success("Exported to Excel!");
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        autoTable(doc, {
            head: [['Name', 'Email', 'Phone', 'State', 'Status', 'Date']],
            body: filteredInquiries.map(
                ({ name, email, phone, state, status, createdAt }) => ([
                    name, email, phone, state, status, new Date(createdAt).toLocaleDateString()
                ])
            ),
        });
        doc.save('inquiries.pdf');
        toast.success("Exported to PDF!");
    };

    return (
        <div>
            <Toaster position="top-right" richColors />
            <h1 className="text-2xl font-bold text-slate-800 mb-6">Inquiries</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <StatCard title="Pending" value={stats.pending} color={{bg: "bg-yellow-100"}} icon={<FileText className="text-yellow-500" size={24} />} />
                <StatCard title="Follow Up" value={stats.followUp} color={{bg: "bg-blue-100"}} icon={<Activity className="text-blue-500" size={24} />} />
                <StatCard title="Complete" value={stats.complete} color={{bg: "bg-green-100"}} icon={<CheckCircle className="text-green-500" size={24} />} />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200/80">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
                    <div className="relative w-full sm:w-auto sm:max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={exportToExcel} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700">
                            <Download size={16} /> Excel
                        </button>
                        <button onClick={exportToPDF} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700">
                            <Download size={16} /> PDF
                        </button>
                    </div>
                </div>

                <div className="overflow-visible">
                    <table className="w-full text-sm text-left text-slate-500">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-100">
                            <tr>
                                <th scope="col" className="p-4">Name</th>
                                <th scope="col" className="p-4">Contact</th>
                                <th scope="col" className="p-4">State</th>
                                <th scope="col" className="p-4">Status</th>
                                <th scope="col" className="p-4">Date</th>
                                <th scope="col" className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="6" className="text-center p-8">Loading...</td></tr>
                            ) : paginatedInquiries.length === 0 ? (
                                <tr><td colSpan="6" className="text-center p-8">No inquiries found.</td></tr>
                            ) : (
                                paginatedInquiries.map(inquiry => (
                                    <InquiryRow 
                                        key={inquiry._id} 
                                        inquiry={inquiry} 
                                        onViewDetails={() => handleViewDetails(inquiry)} 
                                        onStatusUpdate={handleStatusUpdate}
                                        onDelete={handleDelete}
                                    />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                
                {totalPages > 1 && (
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-sm text-gray-700">
                            Page {currentPage} of {totalPages}
                        </span>
                        <div className="inline-flex rounded-md shadow-sm">
                            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 disabled:opacity-50">
                                Previous
                            </button>
                            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 disabled:opacity-50">
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <InquiryModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                inquiry={selectedInquiry}
                onAddRemark={handleAddRemark}
            />
            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                isDeleting={isDeleting}
            />
        </div>
    );
}