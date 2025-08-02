package com.example.jiraBack.mapper;

import com.example.jiraBack.dto.UserDto;
import com.example.jiraBack.dto.UserProfileDto;
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
        userProfile.setPostUsers(userProfileDto.getPostUsers());
        userProfile.setDepartmentUser(userProfileDto.getDepartmentUser());
        userProfile.setLocationUsers(userProfileDto.getLocationUsers());
        userProfile.setOrganizationUsers(userProfileDto.getOrganizationUsers());
    }
}
