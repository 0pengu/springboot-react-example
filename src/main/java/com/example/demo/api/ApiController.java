package com.example.demo.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.common.dto.ApiResponse;

@RestController
@RequestMapping("/api")
public class ApiController {

	@GetMapping("")
	public ResponseEntity<ApiResponse<Void>> apiIndex() {
		return ResponseEntity.ok().body(new ApiResponse<>(true, "Hello World!", null));
	}

};