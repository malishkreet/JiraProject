package com.example.jiraBack.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;


@Entity
@Table(name = "user_profile")
@Data
@RequiredArgsConstructor
public class UserProfile {

    @Id
    private Long userId;

    @OneToOne
    @MapsId
    private User user;

    @Column(name = "organization_users")
    private String organizationUsers;

    @Column(name = "department_users")
    private String departmentUser;

    @Column(name = "location_users")
    private String locationUsers;

    @Column(name = "post_users")
    private String postUsers;
}
