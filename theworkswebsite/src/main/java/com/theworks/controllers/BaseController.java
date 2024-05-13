package com.theworks.controllers;

import java.io.IOException;
import java.io.Serializable;

import jakarta.faces.application.FacesMessage;
import jakarta.faces.context.FacesContext;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public abstract class BaseController implements Serializable {
	private static final long serialVersionUID = 1L;
	protected String mode;

	public String getParameter(String name) {
		for (String key : FacesContext.getCurrentInstance().getExternalContext().getRequestParameterMap().keySet()) {
			System.out.println(key);
		}
		return (String) FacesContext.getCurrentInstance().getExternalContext().getRequestParameterMap().get(name);
	}

	public void addMessage(String message) {
		FacesContext.getCurrentInstance().addMessage(null,
				new FacesMessage(FacesMessage.SEVERITY_INFO, message, message));
	}

	public void addWarning(String message) {
		FacesContext.getCurrentInstance().addMessage(null,
				new FacesMessage(FacesMessage.SEVERITY_WARN, message, message));
	}

	public void addError(String message) {
		FacesContext.getCurrentInstance().addMessage(null,
				new FacesMessage(FacesMessage.SEVERITY_ERROR, message, message));
	}

	public void redirect(String url) {
		try {
			FacesContext.getCurrentInstance().getExternalContext().redirect(url);
		} catch (IOException e) {
			log.error(e.getMessage());
		}
	}
}
