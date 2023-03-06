package com.senderbr.ilhapetslz.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Map;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Veterinario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String name;

    private ArrayList<Integer> days;

    @Column(length = 5000)
    private ArrayList<ArrayList<String>> hours;

    private ArrayList<Integer> especs;
    public Veterinario(String name) {
        this.name = name;
    }
}
