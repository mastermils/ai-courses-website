const handleUpdate = (e) => {
  e.preventDefault();
  if (!editingCourse || !editingCourse._id) {
    console.error("Course ID is missing");
    setNotification("Course ID is missing. Unable to update.");
    return;
  }
  console.log("Updating course with ID:", editingCourse._id);
  setLoading(true);
  fetch(, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedCourse),
  })
    .then((response) => response.json())
    .then((updated) => {
      setCourses(courses.map((course) => (course._id === updated._id ? updated : course)));
      setEditingCourse(null);
      setNotification("Course updated successfully!");
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error updating course:", error);
      setNotification("Failed to update course.");
      setLoading(false);
    });
};

