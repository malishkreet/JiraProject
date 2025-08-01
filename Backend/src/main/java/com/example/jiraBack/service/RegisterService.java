package com.example.jiraBack.service;

import com.example.jiraBack.dto.*;
import org.springframework.data.crossstore.ChangeSetPersister;

import javax.naming.AuthenticationException;



public interface RegisterService {

    String addUser(RegisterDto dto);
}
