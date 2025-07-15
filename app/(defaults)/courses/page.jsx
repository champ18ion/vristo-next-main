  'use client';
  import React, { useState, useEffect } from 'react';
  import Tippy from '@tippyjs/react';
  import 'tippy.js/dist/tippy.css';
  import IconEdit from '@/components/icon/icon-edit';
  import IconTrashLines from '@/components/icon/icon-trash-lines';
  import IconLink from '@/components/icon/icon-link';
  import IconCaretsDown from '@/components/icon/icon-carets-down';
  import IconMultipleForwardRight from '@/components/icon/icon-multiple-forward-right';


  const API_BASE_URL = process.env.NEXT_PUBLIC_URL || "https://api.codingwise.in/";

  const CourseCardExplorer = () => {
    const [courses, setCourses] = useState([]);
    const [expandedCourses, setExpandedCourses] = useState({});

    useEffect(() => {
      fetch(`${API_BASE_URL}courses/all`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setCourses(data.data);
          }
        });
    }, []);

    const toggleCourse = (courseId) => {
      setExpandedCourses(prev => ({
        ...prev,
        [courseId]: !prev[courseId]
      }));
    };

    return (
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course.id} className="border rounded-lg shadow-md p-4 bg-white">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{course.name || 'Untitled Course'}</h3>
                <p className="text-sm text-gray-500 mt-1">₹{course.price}</p>
                <span className={`inline-block text-xs font-medium mt-2 px-2 py-1 rounded ${
                  course.is_published ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {course.is_published ? 'Published' : 'Unpublished'}
                </span>
              </div>
              <div className="space-x-2 flex items-center">
                <Tippy content="Edit">
                  <button className="text-blue-600 hover:text-blue-800">
                    <IconEdit />
                  </button>
                </Tippy>
                <Tippy content="Delete">
                  <button className="text-red-600 hover:text-red-800">
                    <IconTrashLines />
                  </button>
                </Tippy>
                {course.modules && (
                  <button onClick={() => toggleCourse(course.id)} className="ml-2">
                    {expandedCourses[course.id] ? <IconCaretsDown /> : <IconMultipleForwardRight />}
                  </button>
                )}
              </div>
            </div>

            {expandedCourses[course.id] && course.modules && (
              <div className="mt-4">
                {Object.values(course.modules).map((module) => (
                  <div key={module.id} className="mb-3 border-l-2 border-blue-500 pl-3">
                    <h4 className="text-sm font-semibold text-blue-600">{module.name}</h4>
                    <p className="text-xs text-gray-500 mb-1">{module.description}</p>

                    {module.content_items && module.content_items.length > 0 ? (
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        {module.content_items.map(item => (
                          <li key={item.id} className="flex items-center justify-between">
                            <span>
                              {item.content_type === 'video' ? '🎥' : '📄'} {item.name}
                            </span>
                            <div className="space-x-2 flex items-center">
                              <Tippy content="Open">
                                <a href={item.content_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                                  <IconLink />
                                </a>
                              </Tippy>
                              <Tippy content="Edit">
                                <button className="text-green-500 hover:text-green-700">
                                  <IconEdit />
                                </button>
                              </Tippy>
                              <Tippy content="Delete">
                                <button className="text-red-500 hover:text-red-700">
                                  <IconTrashLines />
                                </button>
                              </Tippy>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-gray-400 italic">No content items</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  export default CourseCardExplorer;
