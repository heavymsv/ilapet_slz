package com.senderbr.ilhapetslz.entities;

import com.senderbr.ilhapetslz.enums.PETS_TIPO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Vacina {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String name;

    private int doses;

    private PETS_TIPO tipo;
}
