package br.com.opengd.scheduler;

import br.com.opengd.service.FattureWebService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class FattureWebScheduler {
    Logger logger = LoggerFactory.getLogger(FattureWebScheduler.class);

    private final FattureWebService fattureWebService;

    public FattureWebScheduler(FattureWebService fattureWebService) {
        this.fattureWebService = fattureWebService;
    }

    //@Scheduled(cron = "0 0 2 * * ?") // Executa todos os dias às 2h da manhã
    public void executarTarefaDiaria() {
        logger.info("Iniciando tarefa diária de processamento de faturas.");
        //fattureWebService.processarFaturas();
    }
}
