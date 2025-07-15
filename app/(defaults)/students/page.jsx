'use client';

import React, { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Swal from 'sweetalert2';
import IconSettings from '@/components/icon/icon-settings';
import IconTrashLines from '@/components/icon/icon-trash-lines';
import IconPencil from '@/components/icon/icon-pencil';
import IconCaretDown from '@/components/icon/icon-caret-down';
import IconArrowForward from '@/components/icon/icon-arrow-forward';

const StudentsTable = () => {
  const [students, setStudents] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [expandedRows, setExpandedRows] = useState({});

  useEffect(() => {
    fetch('https://api.codingwise.in/users/all')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.users)) setStudents(data.users);
      });

    fetch('https://api.codingwise.in/courses/all')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          const courses = data.data.map(c => ({ id: c.id, name: c.name || `Course #${c.id}` }));
          setAvailableCourses(courses);
        }
      });
  }, []);

  const toggleExpand = (id) => setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }));

  const handleRemoveAccess = (sid, cid) => {
    const student = students.find(s => s.id === sid);
    const course = student?.enrolled_courses.find(c => c.id === cid);
    if (!course) return;

    Swal.fire({
      title: 'Are you sure?',
      html: `Remove <strong>${course.name}</strong> from <strong>${student.email}</strong>?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then(result => {
      if (result.isConfirmed) {
        setStudents(prev => prev.map(s =>
          s.id === sid ? { ...s, enrolled_courses: s.enrolled_courses.filter(c => c.id !== cid) } : s
        ));
        Swal.fire('Removed!', '', 'success');
      }
    });
  };

  const handleAssignToStudent = (e, student) => {
    e.preventDefault();
    const courseId = parseInt(e.target.courseId.value);
    const course = availableCourses.find(c => c.id === courseId);
    if (!course) return;

    const already = student.enrolled_courses.some(c => c.id === course.id);
    if (already) return Swal.fire('Duplicate!', 'Course already assigned.', 'info');

    setStudents(prev => prev.map(s =>
      s.id === student.id ? {
        ...s,
        enrolled_courses: [...s.enrolled_courses, {
          id: course.id,
          name: course.name,
          purchase_date: new Date().toISOString(),
        }],
      } : s
    ));

    Swal.fire('Assigned!', `${course.name} assigned to ${student.email}`, 'success');
    e.target.reset();
  };

  const handleAssignToNewUser = (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const courseId = parseInt(e.target.courseId.value);
    const course = availableCourses.find(c => c.id === courseId);
    if (!email || !course) return;

    Swal.fire('Assigned!', `${course.name} assigned to ${email}`, 'success');
    e.target.reset();
  };

  return (
    <div className="p-6">
      <div className="mb-8 p-4 bg-white rounded-lg shadow border">
        <h2 className="text-lg font-semibold mb-3">Assign Course to New User</h2>
        <form onSubmit={handleAssignToNewUser} className="flex flex-col sm:flex-row gap-4">
          <input
            name="email"
            type="email"
            placeholder="User email"
            required
            className="flex-1 border rounded px-4 py-2"
          />
          <select name="courseId" className="flex-1 border rounded px-4 py-2" required>
            <option value="">Select Course</option>
            {availableCourses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <button type="submit" className="bg-blue-600 text-white rounded px-6 py-2 hover:bg-blue-700">
            Assign
          </button>
        </form>
      </div>

      <div className="overflow-x-auto border rounded-lg shadow">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50 text-sm font-semibold text-gray-600">
            <tr>
              <th className="p-3"></th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Courses</th>
              <th className="p-3 text-left">Last Enrolled</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-100">
            {students.map(student => {
              const fullName = `${student.first_name || ''} ${student.last_name || ''}`.trim() || student.username;
              const lastCourse = student.enrolled_courses.slice(-1)[0];

              return (
                <React.Fragment key={student.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="p-3">
                      <button onClick={() => toggleExpand(student.id)} className="text-gray-500">
                        {expandedRows[student.id] ? <IconCaretDown /> : <IconArrowForward />}
                      </button>
                    </td>
                    <td className="p-3 font-medium text-gray-800">{fullName}</td>
                    <td className="p-3 text-gray-600">{student.email}</td>
                    <td className="p-3">
                      <span className="bg-blue-50 text-blue-700 px-2 py-1 text-xs rounded">
                        {student.enrolled_courses.length} course(s)
                      </span>
                    </td>
                    <td className="p-3 text-gray-500">
                      {lastCourse?.purchase_date?.split('T')[0] || 'N/A'}
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex justify-center gap-2">
                        <Tippy content="Settings">
                          <button className="text-blue-500 hover:text-blue-700"><IconSettings /></button>
                        </Tippy>
                        <Tippy content="Edit">
                          <button className="text-green-500 hover:text-green-700"><IconPencil /></button>
                        </Tippy>
                        <Tippy content="Delete">
                          <button className="text-red-500 hover:text-red-700"><IconTrashLines /></button>
                        </Tippy>
                      </div>
                    </td>
                  </tr>

                  {expandedRows[student.id] && (
                    <tr className="bg-gray-50">
                      <td colSpan={6} className="p-4">
                        <h4 className="font-medium text-sm mb-2">Enrolled Courses</h4>
                        {student.enrolled_courses.length === 0 ? (
                          <p className="text-xs text-gray-500 italic">No courses enrolled.</p>
                        ) : (
                          <ul className="space-y-2">
                            {student.enrolled_courses.map(course => (
                              <li key={course.id} className="flex justify-between border px-3 py-2 rounded bg-white shadow-sm">
                                <span className="text-sm text-gray-700">{course.name}</span>
                                <button
                                  onClick={() => handleRemoveAccess(student.id, course.id)}
                                  className="text-xs text-red-600 hover:text-red-800"
                                >
                                  Remove Access
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}

                        <form onSubmit={(e) => handleAssignToStudent(e, student)} className="mt-4 flex gap-2">
                          <select name="courseId" className="border px-3 py-1 rounded text-sm w-full sm:w-auto" required>
                            <option value="">Select Course</option>
                            {availableCourses.map(c => (
                              <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                          </select>
                          <button type="submit" className="bg-green-600 text-white text-sm px-3 py-1 rounded hover:bg-green-700">
                            Assign
                          </button>
                        </form>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsTable;
