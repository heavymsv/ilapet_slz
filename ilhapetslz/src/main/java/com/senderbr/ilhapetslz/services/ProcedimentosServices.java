package com.senderbr.ilhapetslz.services;

import com.senderbr.ilhapetslz.entities.Pet;
import com.senderbr.ilhapetslz.entities.Procedimentos;
import com.senderbr.ilhapetslz.repositories.ProcedimentosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class ProcedimentosServices {

    @Autowired
    ProcedimentosRepository repository;

    @Transactional
    public Procedimentos post(Procedimentos procedimentos){
        if(
                (repository.findByProcedimentoIdAndDateAndVeterinario(
                        procedimentos.getProcedimentoId(),
                        procedimentos.getDate(),
                        procedimentos.getVeterinario())).size()>0
        ) throw new EntityExistsException("Ja existe um apontamento com esse horário, favor escolher outro horário!!");
        return repository.save(procedimentos);
    }

    public Page<Procedimentos> getPendentes(Pageable pageable){return repository.findByPendenteFalseOrderByDate(pageable);}

    public Page<Procedimentos> getNaoPendentes(Pageable pageable){return repository.findByPendenteTrueOrderByDate(pageable);}

    public Page<Procedimentos> get(Pageable pageable){return repository.findAll(pageable);}

    public List<Procedimentos> getByPet(Long idPet){return repository.findByPetId(idPet);}

    public Page<Procedimentos> getByVeterinario(Long idVeterinario, Pageable pageable){return repository.findByVeterinarioId(idVeterinario, pageable);}

    public Procedimentos getById(Long id){
        Optional<Procedimentos> optProcedimentos = repository.findById(id);
        Procedimentos procedimentos = optProcedimentos.orElseThrow(()->new EntityNotFoundException("No such Procedimento"));
        return procedimentos;
    }

    public Procedimentos put(Long id, Procedimentos procedimentos){
        Procedimentos oldProcedimentos = this.getById(id);
        oldProcedimentos.setPendente(procedimentos.isPendente());
        oldProcedimentos.setObs(procedimentos.getObs());

        return this.post(oldProcedimentos);
    }

    @Transactional
    public void delete(Long id){
        Procedimentos oldProcedimentos = this.getById(id);

        repository.delete(oldProcedimentos);
    }

    public List<Procedimentos> getByCalendar(Long clienteId) {
        return repository.findByPetUserIdAndPendenteFalseOrderByDate(clienteId);
    }

    public Page<Procedimentos> getByVarious(Pageable pageable, boolean pendente, String name,int op) {
        if(op==1){
            return repository.findByPetUserUsernameContainingAndPendenteEqualsOrderByDate(name, pendente, pageable);
        }else if(op ==2){
            return repository.findByPetNameContainingAndPendenteEqualsOrderByDate(name, pendente, pageable);
        }else{
            return repository.findByVeterinarioNameContainingAndPendenteEqualsOrderByDate(name, pendente, pageable);
        }
    }
}
