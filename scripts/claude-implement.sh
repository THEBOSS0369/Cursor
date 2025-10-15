#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}═══════════════════════════════════════${NC}"
echo -e "${BLUE}   Claude Code - Feature Implementation${NC}"
echo -e "${BLUE}═══════════════════════════════════════${NC}"
echo ""

# Get task description
echo -e "${GREEN}What do you want to implement?${NC}"
echo "Enter a description (or press Enter to use interactive mode):"
read TASK_DESCRIPTION

if [ -z "$TASK_DESCRIPTION" ]; then
    echo -e "${BLUE}Starting Claude Code in interactive mode...${NC}"
    claude
else
    echo -e "${BLUE}Starting Claude Code with task: ${TASK_DESCRIPTION}${NC}"
    echo ""
    
    # Create the prompt
    PROMPT="I need you to implement the following feature:

Task: $TASK_DESCRIPTION

Before you start:
1. Read and understand .claude/context.md
2. Study the examples in .claude/examples.md
3. Follow ALL standards in .claude/coding-standards.md
4. Use utilities and patterns from .claude/knowledge-base.md

Implementation Steps:
1. Analyze the existing codebase to understand current patterns
2. Implement the feature following our exact patterns
3. Write comprehensive tests (unit + integration)
4. Review your own code for:
   - Security issues
   - Performance problems
   - Code style consistency
   - Edge cases
5. Run all tests and ensure they pass
6. Create a commit with proper message format

Important:
- Follow the EXACT patterns shown in examples.md
- Do NOT deviate from coding standards
- Use existing utilities, don't recreate them
- Write tests that match our testing patterns

Begin implementation now."

    # Run Claude Code with the prompt
    if [ -n "$PROMPT" ]; then
        claude "$PROMPT"
    else
        echo -e "${RED}Error: Prompt is empty. Falling back to interactive mode.${NC}"
        claude
    fi
fi

echo ""
echo -e "${GREEN}✓ Done!${NC}"