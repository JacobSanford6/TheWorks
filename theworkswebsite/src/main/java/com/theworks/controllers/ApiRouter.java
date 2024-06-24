package com.theworks.controllers;

import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/shop")
@Component
public class ApiRouter {
	
	private HttpSession session;
	
	public ApiRouter(HttpSession session) {
		this.session = session;
	}
	
	@GetMapping("/{id}")
	public void test(@PathVariable String id, ServletRequest request, ServletResponse response) {
		session.setAttribute("productId", id);
		try {
			session.getServletContext().getRequestDispatcher("/shop.xhtml").forward(request, response);
		} catch (ServletException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println("***SOMETHING HAPPENED");
	}
}
