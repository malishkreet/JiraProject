package com.example.jiraBack.mapper;

import com.example.jiraBack.dto.UserDto;
import com.example.jiraBack.dto.UserProfileDto;
import com.example.jiraBack.entity.User;
import com.example.jiraBack.entity.UserProfile;
import org.springframework.stereotype.Component;

@Component
public class UserProfileMapper {
    public UserProfileDto toDto (UserProfile userProfile) {
        if (userProfile == null) {
            return null;
        }
        UserProfileDto userProfileDto = new UserProfileDto();
        userProfileDto.setPostUsers(userProfile.getPostUsers());
        userProfileDto.setDepartmentUser(userProfile.getDepartmentUser());
        userProfileDto.setLocationUsers(userProfile.getLocationUsers());
        userProfileDto.setOrganizationUsers(userProfile.getOrganizationUsers());
        if (userProfile.getUser().getFirstName() != null) {
            userProfileDto.setFirstName(userProfile.getUser().getFirstName());
        }
        return userProfileDto;
    }

    public void updateUserProfile(UserProfileDto userProfileDto, UserProfile userProfile) {
        if (userProfileDto.getPostUsers() != null)userProfile.setPostUsers(userProfileDto.getPostUsers());
        if (userProfileDto.getDepartmentUser() != null) userProfile.setDepartmentUser(userProfileDto.getDepartmentUser());
        if (userProfileDto.getLocationUsers() != null) userProfile.setLocationUsers(userProfileDto.getLocationUsers());
        if (userProfileDto.getOrganizationUsers() != null) userProfile.setOrganizationUsers(userProfileDto.getOrganizationUsers());
    }
}
