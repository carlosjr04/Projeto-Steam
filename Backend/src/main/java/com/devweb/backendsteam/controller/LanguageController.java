package com.devweb.backendsteam.controller;

import com.devweb.backendsteam.model.Language;
import com.devweb.backendsteam.service.LanguageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("languages")
public class LanguageController {

    @Autowired
    private LanguageService languageService;

    @GetMapping
    public List<Language> listarIdiomas() {
        return languageService.listarIdiomas();
    }
}
