package com.theworks.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.theworks.entities.User;

@Repository
public interface UserRepo extends JpaRepository<User, Integer> {

}
