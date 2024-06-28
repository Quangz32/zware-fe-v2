import React, { useState, useEffect, useCallback } from "react";
import MyAxios from "../../util/MyAxios";
import defaultProfileImage from "./defaultProfileImage.jpg";
import MyAlert from "../share/MyAlert";

const Profile = () => {
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    role: "",
    date_of_birth: "", // Assuming date_of_birth is a string from backend
    phone: "",
    gender: "",
    avatar: "",
    warehouse_id: "",
  });
  const [initialProfile, setInitialProfile] = useState(null);
  const [warehouseName, setWarehouseName] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [imageData, setImageData] = useState("");

  useEffect(() => {
    if (profile.id) {
      fetchImageData();
    }
  }, [profile.id]);

  const fetchProfile = useCallback(() => {
    MyAxios.get("/users/me")
      .then((response) => {
        const profileData = response.data.data;
        if (profileData.date_of_birth) {
          profileData.date_of_birth = profileData.date_of_birth.slice(0, 10);
        }
        setProfile(profileData);
        setInitialProfile(profileData);
        if (profileData.warehouse_id) {
          fetchWarehouseName(profileData.warehouse_id);
        }
      })
      .catch((error) => {
        console.error('Error fetching profile:', error);
        setAlertMessage(error.response?.data?.message || "Error fetching profile");
        setAlertVariant("danger");
        triggerAlert();
      });
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const fetchWarehouseName = (warehouseId) => {
    MyAxios.get(`warehouses/${warehouseId}`)
      .then((response) => {
        const warehouseData = response.data.data;
        setWarehouseName(warehouseData.name);
      })
      .catch((error) => {
        console.error('Error fetching warehouse name:', error);
        setWarehouseName('Unknown');
      });
  };

  const fetchImageData = () => {
    MyAxios.get(`/users/${profile.id}/avatars`, {
      responseType: 'arraybuffer',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        const base64Image = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        setImageData(`data:image/jpeg;base64,${base64Image}`);
      })
      .catch((error) => {
        console.error("Error fetching image data:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setImageData(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let modifiedData = {};
      for (const key in profile) {
        if (profile[key] !== initialProfile[key]) {
          modifiedData[key] = profile[key];
        }
      }

      if (Object.keys(modifiedData).length > 0 || avatarFile) {
        if (avatarFile) {
          const formData = new FormData();
          formData.append('file', avatarFile);
          await MyAxios.post(`/users/${profile.id}/avatars`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
            .then(response => {
              setAlertMessage(response.data.message);
              setAlertVariant("success");
              triggerAlert();
            })
            .catch(error => {
              console.error('Error uploading avatar:', error);
              setAlertMessage(error.response?.data?.message || "Error uploading avatar");
              setAlertVariant("danger");
              triggerAlert();
            });
        }

        if (Object.keys(modifiedData).length > 0) {
          await MyAxios.put(`/users/${profile.id}`, modifiedData)
            .then(response => {
              setAlertMessage(response.data.message);
              setAlertVariant("success");
              setInitialProfile(profile); // Sync initialProfile with the latest profile
              triggerAlert();
            });
        }
      } else {
        setAlertMessage("No changes to save.");
        setAlertVariant("info");
        triggerAlert();
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setAlertMessage(error.response?.data?.message || "Error updating profile");
      setAlertVariant("danger");
      triggerAlert();
    }
  };

  const triggerAlert = () => {
    setShowAlert(true);
  };

  return (
    <div className="container centered-container ms-6">
      <div className="w-100">
        <div className="">
          <div className="container rounded bg-white p-4">
            <div className="row">
              <div className="col-md-3 border-right d-flex flex-column align-items-center text-center p-3 py-5">
                <img
                  className="rounded-circle mt-5"
                  width="150px"
                  src={imageData || defaultProfileImage}
                  alt="Profile"
                />
                <span className="font-weight-bold mt-3" style={{ color: "black" }}>
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
                      <h1 className="text-right title-profile" style={{ fontSize: '35px' }} >Profile</h1>
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
                          readOnly
                          disabled
                        />
                      </div>
                    </div>
                    <div className="row mt-3">
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
                          disabled
                        />
                      </div>
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
                    </div>
                    <div className="row mt-3">
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
                      <div className="col-md-6">
                        <label className="labels">Gender</label>
                        <select
                          className="form-control"
                          name="gender"
                          value={profile.gender}
                          onChange={handleChange}
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>
                    </div>
                    <div className="row mt-3">
                      {profile.role !== "admin" && (
                        <div className="col-md-6">
                          <label className="labels">Warehouse Name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="warehouse_id"
                            name="warehouse_id"
                            value={warehouseName}
                            readOnly
                            disabled
                          />
                        </div>
                      )}
                    </div>
                    <div className="mt-5 text-center">
                      <button className="btn btn-primary profile-button" type="submit">
                        Save Profile
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MyAlert
        variant={alertVariant}
        message={alertMessage}
        show={showAlert}
        setShow={setShowAlert}
      />
    </div>
  );
};

export default Profile;
