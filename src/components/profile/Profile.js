import React, { useState, useEffect } from 'react';
import MyAxios from '../../util/MyAxios'; 


const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    date_of_birth: '',
    phone: '',
    gender: '',
    avatar: '',
    warehouse_id: ''
  });
  

  // Fetch user profile on component mount
  useEffect(() => {
    fetchProfile();
  }, []);
  

  const fetchProfile = () => {
    MyAxios.get('/users/me')
      .then(response => {
        setProfile(response.data.data); 
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (upload) => {
        setProfile({
          ...profile,
          avatar: upload.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    MyAxios.put(`/users/${profile.id}`, profile)
      .then(response => {
        console.log('Profile updated successfully:', response.data);
        
      })
      .catch(error => {
        console.error('Error updating profile:', error);
        
      });
  };

  return (
    <div className="container centered-container">
      <div className="w-100">
        <div className="">
          <div className="container rounded bg-white p-4">
            <div className="row">
              <div className="col-md-3 border-right d-flex flex-column align-items-center text-center p-3 py-5">
                <img
                  className="rounded-circle mt-5"
                  width="150px"
                  src={profile.avatar || 'https://via.placeholder.com/150'}
                  alt="Profile"
                />
                <span className="font-weight-bold mt-3" style={{ color: 'black' }}>
                  {profile.name || "Name"}
                </span>
                <div className="mt-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-9 border-right">
                <form onSubmit={handleSubmit}>
                  <div className="p-3 py-5">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h1 className="text-right title-profile">Profile</h1>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-6">
                        <label className="labels">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="name"
                          name="name"
                          value={profile.name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="labels">Email</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="email"
                          name="email"
                          value={profile.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-6">
                        <label className="labels">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="password"
                          name="password"
                          value={profile.password}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="labels">Role</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="role"
                          name="role"
                          value={profile.role}
                          onChange={handleChange}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-6">
                        <label className="labels">Date of Birth</label>
                        <input
                          type="date"
                          className="form-control"
                          name="date_of_birth"
                          value={profile.date_of_birth}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="labels">Phone</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="phone"
                          name="phone"
                          value={profile.phone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-6">
                        <label className="labels">Gender</label>
                        <select
                          className="form-control"
                          name="gender"
                          value={profile.gender}
                          onChange={handleChange}
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>
                      {profile.role !== 'admin' && (
                        <div className="col-md-6">
                          <label className="labels">Warehouse ID</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="warehouse_id"
                            name="warehouse_id"
                            value={profile.warehouse_id}
                            onChange={handleChange}
                          />
                        </div>
                      )}
                    </div>
                    <div className="mt-5 text-center">
                      <button className="btn btn-primary profile-button" type="submit">Save Profile</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
