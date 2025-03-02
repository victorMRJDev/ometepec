import React from 'react'
import ProfileInfo from '../../components/profile/ProfileInfo';
import { useUser } from '../../hooks/UserContext';

const ProfileUser = ()=> {

  const { user } = useUser();
  return (
    <div className="min-h-screen py-10">
      <ProfileInfo dataInfo={user}/>
    </div>
  )
}

export default ProfileUser;