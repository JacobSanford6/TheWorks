package com.theworks.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.theworks.entities.OtherImage;

@Repository
public interface OtherImageRepo extends JpaRepository<OtherImage, Integer> {

}
