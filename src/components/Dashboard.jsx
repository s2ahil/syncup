import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteInterview, setFilter } from '../store/actions';
import Calendar from './Calendar';
import Notification from './Notification';
const Dashboard = () => {
    const interviews = useSelector(state => state.interviews);
    const filters = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this interview?')) {
            dispatch(deleteInterview(id));
        }
    };

    const filteredInterviews = interviews.filter(interview => {
        const dateMatch = !filters.date || new Date(interview.date).toDateString() === new Date(filters.date).toDateString();
        const interviewerMatch = !filters.interviewer || interview.interviewer.toLowerCase().includes(filters.interviewer.toLowerCase());
        const candidateMatch = !filters.candidate || interview.candidate.toLowerCase().includes(filters.candidate.toLowerCase());
        return dateMatch && interviewerMatch && candidateMatch;
    });

    return (
        <div className='p-6'>

            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4">Interview Dashboard</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        type="date"
                        value={filters.date || ''}
                        onChange={(e) => dispatch(setFilter({ date: e.target.value }))}
                        className="border p-2 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Filter by interviewer"
                        value={filters.interviewer}
                        onChange={(e) => dispatch(setFilter({ interviewer: e.target.value }))}
                        className="border p-2 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Filter by candidate"
                        value={filters.candidate}
                        onChange={(e) => dispatch(setFilter({ candidate: e.target.value }))}
                        className="border p-2 rounded"
                    />
                </div>
            </div>

            <div className="grid gap-4 h-[40rem] overflow-y-auto border">
                {
                    filteredInterviews.slice().reverse().map(interview => (
                    <div key={interview.id} className="bg-white p-4 rounded shadow">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold">{interview.candidate}</h3>
                                <p className="text-gray-600">Interviewer: {interview.interviewer}</p>
                                <p className="text-gray-600">Type: {interview.type}</p>
                                <p className="text-gray-600">
                                    {new Date(interview.date).toLocaleDateString()} at {interview.time}
                                </p>
                            </div>
                            <div>
                                <button
                                    onClick={() => navigate(`/edit/${interview.id}`)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(interview.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='mt-10 border p-2'>
            <h2 className="text-2xl font-bold mb-4">Calendar schedule</h2>
            <Calendar></Calendar>
            </div>
        </div>
    )
}

export default Dashboard
