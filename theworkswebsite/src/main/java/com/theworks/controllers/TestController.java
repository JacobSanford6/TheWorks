package com.theworks.controllers;

import java.util.List;
import java.util.Random;

import com.theworks.entities.User;
import com.theworks.repos.UserRepo;

import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Named(value = "testController")
@SessionScoped
public class TestController extends BaseController {
	private static final long serialVersionUID = 1L;
	private String aaa = "balls";
	private UserRepo userRepo;
	private List<User> users;

	public TestController() {
	}

	@Inject
	public TestController(UserRepo userRepo) {
		this.userRepo = userRepo;
	}

	@PostConstruct
	public void init() {
		System.out.println("*^* started testcontroller...");
		Random r = new Random();
		User testUser = new User();
		testUser.setUsername(r.ints(10000, 999999).toString());
		userRepo.save(testUser);
		users = (List<User>) userRepo.findAll();
	}

	public String doSomething() {
		return "index.xhtml";
	}

}
