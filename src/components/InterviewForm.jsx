import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { addInterview, updateInterview } from '../store/actions';
import { INTERVIEW_TYPES } from '../store/types';
import { setNotification } from '../store/actions';

const InterviewForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const interviews = useSelector(state => state.interviews);

  const [formData, setFormData] = useState({
    candidate: '',
    interviewer: '',
    date: '',
    time: '',
    type: INTERVIEW_TYPES.TECHNICAL
  });

  useEffect(() => {
    if (id) {
      const interview = interviews.find(i => i.id === parseInt(id));
      if (interview) {
        setFormData(interview);
      }
    }
  }, [id, interviews]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for conflicts
    const hasConflict = interviews.some(interview => {
      if (id && interview.id === parseInt(id)) return false;
      return (
        interview.date === formData.date &&
        interview.time === formData.time &&
        (interview.interviewer === formData.interviewer ||
         interview.candidate === formData.candidate)
      );
    });

    if (hasConflict) {
      dispatch(setNotification('Time slot conflicts with existing interview', 'error'));
      return;
    }

    if (id) {
      dispatch(updateInterview(parseInt(id), formData));
      dispatch(setNotification('Interview updated successfully'));
    } else {
      dispatch(addInterview(formData));
      dispatch(setNotification('Interview scheduled successfully'));
    }
    navigate('/Dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">
        {id ? 'Edit Interview' : 'Schedule Interview'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Candidate Name</label>
          <input
            type="text"
            required
            value={formData.candidate}
            onChange={(e) => setFormData({ ...formData, candidate: e.target.value })}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Interviewer Name</label>
          <input
            type="text"
            required
            value={formData.interviewer}
            onChange={(e) => setFormData({ ...formData, interviewer: e.target.value })}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Date</label>
          <input
            type="date"
            required
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Time</label>
          <input
            type="time"
            required
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Interview Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full border p-2 rounded"
          >
            {Object.values(INTERVIEW_TYPES).map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {id ? 'Update Interview' : 'Schedule Interview'}
        </button>
      </form>
    </div>
  );
};

export default InterviewForm;