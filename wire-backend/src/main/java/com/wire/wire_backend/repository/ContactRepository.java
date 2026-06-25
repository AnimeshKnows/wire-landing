package com.wire.wire_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wire.wire_backend.model.Contact;

public interface ContactRepository extends JpaRepository<Contact, Long> {}