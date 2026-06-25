package com.wire.wire_backend.controller;

import com.wire.wire_backend.model.Contact;
import com.wire.wire_backend.repository.ContactRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")        // allows your frontend to call the API
public class ContactController {

    private final ContactRepository repo;

    public ContactController(ContactRepository repo) {
        this.repo = repo;
    }

    // POST /submit  ← matches your form's action="/submit"
    @PostMapping("/submit")
    public ResponseEntity<String> submit(@Valid @RequestBody Contact contact) {
        repo.save(contact);
        return ResponseEntity.ok("Message received from " + contact.getName());
    }

    // GET /contacts ← to view all submissions
    @GetMapping("/contacts")
    public List<Contact> getAll() {
        return repo.findAll();
    }
}