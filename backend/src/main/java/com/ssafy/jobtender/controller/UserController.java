package com.ssafy.jobtender.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;
    private final InputService inputService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Autowired
    public UserController(InputService inputService) {
        this.inputService = inputService;
    }
    
    @PostMapping("/keyword")
    public void createInputsKeyword(@RequestBody KeywordInputDTO keywordInputDTO){
        List<String> userKeyWord = keywordInputDTO.getKeyWords();

    }

    @GetMapping("/info")
    public ResponseEntity<UserOutDTO> readUsersByUserId(@RequestParam("userId") String userId) {
        System.out.println("asdfasdf");
        UserOutDTO userOutDTO = this.userService.readUsersByUserId(Long.parseLong(userId));
        return ResponseEntity.status(HttpStatus.OK).body(userOutDTO);
    }
}

